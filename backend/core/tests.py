from django.test import TestCase, Client
from django.urls import reverse
from unittest.mock import patch, MagicMock
import json

class MonitoringTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.url = reverse('system_status')

    @patch('core.monitoring.system_metrics.psutil')
    @patch('core.monitoring.health_checks.connections')
    def test_system_status_success(self, mock_connections, mock_psutil):
        # Mock psutil
        mock_process = MagicMock()
        mock_process.memory_info.return_value.rss = 100 * 1024 * 1024
        mock_psutil.Process.return_value = mock_process
        mock_psutil.virtual_memory.return_value.percent = 40
        mock_psutil.cpu_percent.return_value = 5.0
        mock_psutil.disk_usage.return_value.total = 100 * 1024**3
        mock_psutil.disk_usage.return_value.used = 20 * 1024**3
        mock_psutil.disk_usage.return_value.free = 80 * 1024**3
        mock_psutil.disk_usage.return_value.percent = 20

        # Mock database connection
        mock_conn = MagicMock()
        mock_connections.__getitem__.return_value = mock_conn

        response = self.client.get(self.url)
        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        
        self.assertEqual(data['service_name'], "Portfolio Backend")
        self.assertEqual(data['database'], "connected")
        self.assertEqual(data['memory']['usage_mb'], 100.0)
        self.assertEqual(data['cpu_percent'], 5.0)
        self.assertEqual(data['disk']['percent_used'], 20)
        self.assertIn('uptime_formatted', data)
        self.assertEqual(response['Cache-Control'], "no-store, no-cache, must-revalidate, max-age=0")

    @patch('core.monitoring.system_metrics.psutil')
    @patch('core.monitoring.health_checks.connections')
    def test_system_status_db_failure(self, mock_connections, mock_psutil):
        # Mock psutil (minimal)
        mock_psutil.Process.return_value.memory_info.return_value.rss = 0
        mock_psutil.virtual_memory.return_value.percent = 0
        mock_psutil.cpu_percent.return_value = 0
        mock_psutil.disk_usage.return_value.total = 1
        mock_psutil.disk_usage.return_value.used = 0
        mock_psutil.disk_usage.return_value.free = 1
        mock_psutil.disk_usage.return_value.percent = 0

        # Mock database failure
        mock_connections.__getitem__.side_effect = Exception("DB Connection Error")

        response = self.client.get(self.url)
        
        self.assertEqual(response.status_code, 503)
        data = json.loads(response.content)
        self.assertEqual(data['database'], "disconnected")
