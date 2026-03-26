import json

def parse_data():
    encodings = ['utf-8', 'latin-1', 'cp1252']
    data = None
    for enc in encodings:
        try:
            with open('backend/data.json', 'r', encoding=enc) as f:
                data = json.load(f)
            print(f"Successfully loaded with {enc}")
            break
        except Exception as e:
            print(f"Failed with {enc}: {e}")
    
    if data:
        models = {}
        for item in data:
            model = item['model']
            if model.startswith('core.'):
                if model not in models:
                    models[model] = []
                # Keep fields and pk for reconstruction
                models[model].append({'pk': item['pk'], 'fields': item['fields']})
            
        output = {}
        for model in sorted(models.keys()):
            output[model] = models[model]
        
        with open('d:/typescript-portfolio/extracted_data.json', 'w', encoding='utf-8') as f:
            json.dump(output, f, indent=2)
        print("Data extracted to extracted_data.json")
    else:
        print("Could not load data.")

if __name__ == "__main__":
    parse_data()
