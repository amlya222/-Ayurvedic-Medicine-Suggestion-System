import ashwagandhaPowder from '../Assets/formulation-images/ashwagandha-powder.jpg';
import garlicCloves from '../Assets/formulation-images/garlic-cloves.jpg';
import arjunaBark from '../Assets/formulation-images/arjuna-bark.jpg';
import bitterGourd from '../Assets/formulation-images/bitter-gourd.jpg';
import fenugreekSeeds from '../Assets/formulation-images/fenugreek-seeds.jpg';
import cinnamonSticks from '../Assets/formulation-images/cinnamon-sticks.jpg';
import tulsiLeaves from '../Assets/formulation-images/tulsi-leaves.jpg';
import gingerRoot from '../Assets/formulation-images/ginger-root.jpg';
import rawHoney from '../Assets/formulation-images/raw-honey.jpg';
import neemLeaves from '../Assets/formulation-images/neem-leaves.jpg';
import giloyVine from '../Assets/formulation-images/giloy-vine.jpg';
import tulsiPlant from '../Assets/formulation-images/tulsi-plant.jpg';
import brahmiLeaves from '../Assets/formulation-images/brahmi-leaves.jpg';
import peppermint from '../Assets/formulation-images/peppermint.jpg';
import lavenderFlowers from '../Assets/formulation-images/lavender-flowers.jpg';
import turmericRoot from '../Assets/formulation-images/turmeric-root.jpg';
import gingerRhizome from '../Assets/formulation-images/ginger-rhizome.jpg';
import boswelliaFrankincense from '../Assets/formulation-images/boswellia-frankincense.jpg';
import vasakaLeaves from '../Assets/formulation-images/vasaka-leaves.jpg';
import licoriceRoot from '../Assets/formulation-images/licorice-root.jpg';
import tulsiBasil from '../Assets/formulation-images/tulsi-basil.jpg';
import ashwagandhaExtract from '../Assets/formulation-images/ashwagandha-extract.jpg';
import jatamansiHerb from '../Assets/formulation-images/jatamansi-herb.jpg';
import ashwagandhaCapsules from '../Assets/formulation-images/ashwagandha-capsules.jpg';
import brahmiTablets from '../Assets/formulation-images/brahmi-tablets.jpg';
import shankhpushpiPowder from '../Assets/formulation-images/shankhpushpi-powder.jpg';
import brahmiOil from '../Assets/formulation-images/brahmi-oil.jpg';
import jatamansiTea from '../Assets/formulation-images/jatamansi-tea.jpg';
import valerianRoot from '../Assets/formulation-images/valerian-root.jpg';
import brahmiGhee from '../Assets/formulation-images/brahmi-ghee.jpg';
import peppermintOil from '../Assets/formulation-images/peppermint-oil.jpg';
import gingerPaste from '../Assets/formulation-images/ginger-paste.jpg';
import tulsiTea from '../Assets/formulation-images/tulsi-tea.jpg';
import gingerTea from '../Assets/formulation-images/ginger-tea.jpg';
import blackPepper from '../Assets/formulation-images/black-pepper.jpg';
import giloyJuice from '../Assets/formulation-images/giloy-juice.jpg';
import tulsiKadha from '../Assets/formulation-images/tulsi-kadha.jpg';
import neemTablets from '../Assets/formulation-images/neem-tablets.jpg';
import licoricePowder from '../Assets/formulation-images/licorice-powder.jpg';
import tulsiDrops from '../Assets/formulation-images/tulsi-drops.jpg';
import vasakaChurna from '../Assets/formulation-images/vasaka-churna.jpg';
import gingerHoney from '../Assets/formulation-images/ginger-honey.jpg';
import honeyComb from '../Assets/formulation-images/honeycomb.jpg';
import licoriceTea from '../Assets/formulation-images/licorice-tea.jpg';
import gingerJuice from '../Assets/formulation-images/ginger-juice.jpg';
import fennelSeeds from '../Assets/formulation-images/fennel-seeds.jpg';
import licoriceTablets from '../Assets/formulation-images/licorice-tablets.jpg';
import aloeVeraGel from '../Assets/formulation-images/aloe-vera-gel.jpg';
import turmericMilk from '../Assets/formulation-images/turmeric-milk.jpg';
import bhringrajOil from '../Assets/formulation-images/bhringraj-oil.jpg';
import kutkiPowder from '../Assets/formulation-images/kutki-powder.jpg';
import neemCapsules from '../Assets/formulation-images/neem-capsules.jpg';
import punarnavaTea from '../Assets/formulation-images/punarnava-tea.jpg';
import gokshuraPowder from '../Assets/formulation-images/gokshura-powder.jpg';
import varunaBark from '../Assets/formulation-images/varuna-bark.jpg';
import arjunaPowder from '../Assets/formulation-images/arjuna-powder.jpg';
import garlicOil from '../Assets/formulation-images/garlic-oil.jpg';
import hawthornBerries from '../Assets/formulation-images/hawthorn-berries.jpg';
class ImageService {

    async generateDiseaseImage(diseaseName: string): Promise<string> {
    // Only use local images
    const localImage = this.getLocalImage(diseaseName);
    if (localImage) {
      return localImage;
    }
    // If no local image found, use fallback SVG or placeholder
    return '/Assets/formulation-images/placeholder.jpg'; // Or your fallback logic
  }
  // Ayurvedic formulation and herb images for different conditions
  private readonly FORMULATION_IMAGES = {
    'hypertension': [
      ashwagandhaPowder, // Ashwagandha root powder
      garlicCloves,     // Fresh garlic cloves
      arjunaBark         // Arjuna tree bark
    ],
    'diabetes': [
      bitterGourd,       // Bitter gourd vegetable
      fenugreekSeeds,    // Fenugreek seeds
      cinnamonSticks     // Cinnamon sticks
    ],
    'cough': [
     tulsiBasil,       // Tulsi holy basil leaves
      gingerRoot,        // Fresh ginger root
      rawHoney           // Raw honey in jar
    ],
    'fever': [
      neemLeaves, // Neem leaves medicinal
      giloyVine, // Giloy green vine
      tulsiPlant  // Tulsi plant leaves
    ],
    'headache': [
      brahmiLeaves, // Brahmi herb leaves
      peppermint, // Fresh peppermint
      lavenderFlowers  // Lavender purple flowers
    ],
    'arthritis': [
     turmericRoot , // Fresh turmeric root
      gingerRhizome, // Ginger rhizome fresh
      boswelliaFrankincense // Boswellia frankincense
    ],
    'asthma': [
     vasakaLeaves, // Vasaka herb leaves
      licoriceRoot, // Licorice root stick
      tulsiBasil // Tulsi sacred basil
    ],
    'anxiety': [
    ashwagandhaPowder, // Ashwagandha powder
    brahmiLeaves, // Brahmi herb extract
    jatamansiHerb  // Jatamansi calming herb
    ],
    'depression': [
      ashwagandhaCapsules, // Ashwagandha capsules
      brahmiTablets, // Brahmi tablets
      shankhpushpiPowder  // Shankhpushpi powder
    ],
    'insomnia': [
      brahmiOil, // Brahmi oil
      jatamansiTea, // Jatamansi tea
      valerianRoot  // Valerian root
    ],
    'migraine': [
      brahmiGhee, // Brahmi ghee
      peppermintOil, // Peppermint oil
      gingerPaste  // Ginger paste
    ],
    'cold': [
      tulsiTea, // Tulsi tea
      gingerTea, // Ginger tea
      blackPepper  // Black pepper
    ],
    'flu': [
      giloyJuice, // Giloy juice
      tulsiKadha, // Tulsi kadha
      neemTablets  // Neem tablets
    ],
    'pneumonia': [
      vasakaChurna, // Vasaka syrup
      licoricePowder, // Licorice powder
      tulsiDrops  // Tulsi drops
    ],
    'bronchitis': [
     vasakaChurna , // Vasaka churna
     gingerHoney , // Ginger honey
     honeyComb // Honey comb
    ],
    'gastritis': [
      licoriceTea, // Licorice tea
      gingerJuice, // Ginger juice
      fennelSeeds  // Fennel seeds
    ],
    'ulcer': [
      licoriceTablets, // Licorice tablets
      aloeVeraGel, // Aloe vera gel
      turmericMilk // Turmeric milk
    ],
    'hepatitis': [
      bhringrajOil, // Bhringraj oil
      kutkiPowder, // Kutki powder
      neemCapsules  // Neem capsules
    ],
    'kidney': [
      punarnavaTea, // Punarnava tea
      gokshuraPowder, // Gokshura powder
      varunaBark  // Varuna bark
    ],
    'heart': [
      arjunaPowder, // Arjuna powder
      garlicOil, // Garlic oil
      hawthornBerries  // Hawthorn berries
    ]
  };


  /**
   * Get formulation image for disease with random selection
   */
  getLocalImage(diseaseName: string): string | null {
    const lowerDisease = diseaseName.toLowerCase();
    
    // Check for exact matches first
    if (this.FORMULATION_IMAGES[lowerDisease as keyof typeof this.FORMULATION_IMAGES]) {
      const images = this.FORMULATION_IMAGES[lowerDisease as keyof typeof this.FORMULATION_IMAGES];
      // Use disease name hash to get consistent but different image for same disease
      const hash = this.hashString(diseaseName);
      const index = hash % images.length;
      return images[index];
    }
    
    // Check for partial matches
    for (const [key, images] of Object.entries(this.FORMULATION_IMAGES)) {
      if (lowerDisease.includes(key) || key.includes(lowerDisease)) {
        // Use disease name hash to get consistent but different image
        const hash = this.hashString(diseaseName);
        const index = hash % images.length;
        return images[index];
      }
    }
    
    // If no specific match, try to get a diverse formulation image based on disease characteristics
    return this.getDiverseFormulationImage(diseaseName);
  }

  /**
   * Get diverse formulation image based on disease characteristics
   */
  private getDiverseFormulationImage(diseaseName: string): string | null {
    const lowerDisease = diseaseName.toLowerCase();
    const hash = this.hashString(diseaseName);
    
    // Define Ayurvedic formulation categories with multiple herb options
    const formulationCategories = {
      'cardiovascular': [
        arjunaBark, // Arjuna
        garlicCloves, // Garlic
        hawthornBerries  // Hawthorn
      ],
      'respiratory': [
        tulsiLeaves, // Tulsi
        vasakaLeaves, // Vasaka
        licoriceRoot  // Licorice
      ],
      'digestive': [
        gingerRoot, // Ginger
        fennelSeeds, // Fennel
        licoriceRoot  // Licorice
      ],
      'neurological': [
        brahmiLeaves, // Brahmi
        peppermint, // Peppermint
        lavenderFlowers  // Lavender
      ],
      'mental': [
        ashwagandhaExtract, // Ashwagandha
        brahmiLeaves, // Brahmi
        jatamansiHerb  // Jatamansi
      ],
      'infectious': [
        neemLeaves, // Neem
        giloyVine, // Giloy
        turmericRoot  // Turmeric
      ],
      'anti-inflammatory': [
        turmericRoot, // Turmeric
        gingerRoot, // Ginger
        boswelliaFrankincense  // Boswellia
      ]
    };

    // Categorize disease based on keywords and assign appropriate Ayurvedic formulations
    if (lowerDisease.includes('heart') || lowerDisease.includes('blood') || lowerDisease.includes('pressure')) {
      const images = formulationCategories.cardiovascular;
      return images[hash % images.length];
    } else if (lowerDisease.includes('lung') || lowerDisease.includes('breath') || lowerDisease.includes('cough')) {
      const images = formulationCategories.respiratory;
      return images[hash % images.length];
    } else if (lowerDisease.includes('stomach') || lowerDisease.includes('digest') || lowerDisease.includes('gut')) {
      const images = formulationCategories.digestive;
      return images[hash % images.length];
    } else if (lowerDisease.includes('head') || lowerDisease.includes('brain') || lowerDisease.includes('nerve')) {
      const images = formulationCategories.neurological;
      return images[hash % images.length];
    } else if (lowerDisease.includes('anxiety') || lowerDisease.includes('depress') || lowerDisease.includes('mental')) {
      const images = formulationCategories.mental;
      return images[hash % images.length];
    } else if (lowerDisease.includes('fever') || lowerDisease.includes('infection') || lowerDisease.includes('virus')) {
      const images = formulationCategories.infectious;
      return images[hash % images.length];
    } else if (lowerDisease.includes('pain') || lowerDisease.includes('inflammation') || lowerDisease.includes('arthritis')) {
      const images = formulationCategories['anti-inflammatory'];
      return images[hash % images.length];
    }

    // Default fallback - general Ayurvedic herbs
    const allImages = Object.values(formulationCategories).flat();
    return allImages[hash % allImages.length];
  }

  /**
   * Simple hash function for consistent image selection
   */
  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

}

export const imageService = new ImageService();
