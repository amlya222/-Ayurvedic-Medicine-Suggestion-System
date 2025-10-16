import pandas as pd
import numpy as np

def display_dataset_info():
    """Display basic information about the Ayurvedic medicine dataset"""
    print("=" * 80)
    print("AYURVEDIC MEDICINE DATASET ANALYSIS")
    print("=" * 80)
    
    # Read the CSV file
    try:
        df = pd.read_csv('AyurGenixAI_Dataset.csv')
        print(f"✅ Dataset loaded successfully!")
        print(f"📊 Dataset Shape: {df.shape[0]} rows × {df.shape[1]} columns")
        print()
        
        # Display column names
        print("📋 COLUMN NAMES:")
        for i, col in enumerate(df.columns, 1):
            print(f"  {i:2d}. {col}")
        print()
        
        # Display basic statistics
        print("📈 BASIC STATISTICS:")
        print(f"  • Total Diseases: {len(df)}")
        print(f"  • Unique Diseases: {df['Disease'].nunique()}")
        print(f"  • Age Groups: {df['Age Group'].unique()}")
        print(f"  • Gender Categories: {df['Gender'].unique()}")
        print(f"  • Doshas: {df['Doshas'].unique()}")
        print()
        
        return df
        
    except FileNotFoundError:
        print("❌ Error: AyurGenixAI_Dataset.csv file not found!")
        return None
    except Exception as e:
        print(f"❌ Error reading file: {e}")
        return None

def display_sample_data(df, num_samples=5):
    """Display sample data from the dataset"""
    if df is None:
        return
    
    print("🔍 SAMPLE DATA (First 5 rows):")
    print("=" * 80)
    
    # Display key columns for better readability
    key_columns = ['Disease', 'Hindi Name', 'Marathi Name', 'Symptoms', 'Ayurvedic Herbs', 'Doshas']
    sample_df = df[key_columns].head(num_samples)
    
    for idx, row in sample_df.iterrows():
        print(f"\n🏥 DISEASE {idx + 1}: {row['Disease']}")
        print(f"   Hindi: {row['Hindi Name']}")
        print(f"   Marathi: {row['Marathi Name']}")
        print(f"   Symptoms: {row['Symptoms']}")
        print(f"   Ayurvedic Herbs: {row['Ayurvedic Herbs']}")
        print(f"   Doshas: {row['Doshas']}")
        print("-" * 60)

def display_disease_categories(df):
    """Display disease categories and their counts"""
    if df is None:
        return
    
    print("\n🏥 DISEASE CATEGORIES:")
    print("=" * 50)
    
    # Count diseases by severity
    severity_counts = df['Symptom Severity'].value_counts()
    print("📊 By Symptom Severity:")
    for severity, count in severity_counts.items():
        print(f"   • {severity}: {count} diseases")
    
    print()
    
    # Count diseases by age group
    age_counts = df['Age Group'].value_counts()
    print("👥 By Age Group:")
    for age, count in age_counts.items():
        print(f"   • {age}: {count} diseases")
    
    print()
    
    # Count diseases by doshas
    dosha_counts = df['Doshas'].value_counts()
    print("⚖️ By Doshas:")
    for dosha, count in dosha_counts.items():
        print(f"   • {dosha}: {count} diseases")

def display_ayurvedic_herbs(df):
    """Display unique Ayurvedic herbs in the dataset"""
    if df is None:
        return
    
    print("\n🌿 AYURVEDIC HERBS IN DATASET:")
    print("=" * 50)
    
    # Get all unique herbs
    all_herbs = []
    for herbs in df['Ayurvedic Herbs'].dropna():
        # Split by comma and clean
        herb_list = [herb.strip() for herb in str(herbs).split(',')]
        all_herbs.extend(herb_list)
    
    unique_herbs = sorted(set(all_herbs))
    print(f"📊 Total Unique Herbs: {len(unique_herbs)}")
    print()
    
    # Display herbs in columns
    for i, herb in enumerate(unique_herbs, 1):
        print(f"{i:2d}. {herb}", end="  ")
        if i % 3 == 0:
            print()

def search_disease(df, disease_name):
    """Search for a specific disease in the dataset"""
    if df is None:
        return
    
    print(f"\n🔍 SEARCHING FOR: {disease_name.upper()}")
    print("=" * 60)
    
    # Search case-insensitive
    matches = df[df['Disease'].str.contains(disease_name, case=False, na=False)]
    
    if len(matches) > 0:
        print(f"✅ Found {len(matches)} matching disease(s):")
        for idx, row in matches.iterrows():
            print(f"\n🏥 {row['Disease']}")
            print(f"   Hindi: {row['Hindi Name']}")
            print(f"   Marathi: {row['Marathi Name']}")
            print(f"   Symptoms: {row['Symptoms']}")
            print(f"   Severity: {row['Symptom Severity']}")
            print(f"   Ayurvedic Herbs: {row['Ayurvedic Herbs']}")
            print(f"   Doshas: {row['Doshas']}")
            print(f"   Formulation: {row['Formulation']}")
            print(f"   Diet Recommendations: {row['Diet and Lifestyle Recommendations']}")
    else:
        print("❌ No matching diseases found.")

def main():
    """Main function to run the dataset analysis"""
    print("🌿 AYURVEDIC MEDICINE DATASET ANALYSIS")
    print("=" * 80)
    
    # Load and display dataset info
    df = display_dataset_info()
    
    if df is not None:
        # Display sample data
        display_sample_data(df)
        
        # Display disease categories
        display_disease_categories(df)
        
        # Display Ayurvedic herbs
        display_ayurvedic_herbs(df)
        
        # Interactive search
        print("\n" + "=" * 80)
        print("🔍 INTERACTIVE SEARCH")
        print("=" * 80)
        
        while True:
            search_term = input("\nEnter a disease name to search (or 'quit' to exit): ").strip()
            
            if search_term.lower() in ['quit', 'exit', 'q']:
                print("👋 Thank you for using the Ayurvedic Medicine Dataset Analyzer!")
                break
            
            if search_term:
                search_disease(df, search_term)
            else:
                print("Please enter a valid disease name.")

if __name__ == "__main__":
    main()
