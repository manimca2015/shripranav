export type ProductDetail = {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  imageId: string;
  images?: string[];
  features: string[];
  specs: { label: string; value: string }[];
};

export const productDetails: ProductDetail[] = [
  {
    id: 'prod-tote',
    slug: 'tote-bags',
    title: 'Tote Bags',
    description: 'Sustainable & stylish eco-friendly bags crafted from premium canvas and cotton.',
    longDescription: 'Our tote bags are more than just accessories; they are a statement of sustainable living. Manufactured using high-grade canvas and organic cotton, these bags are designed for durability and high-weight capacity. We offer various weights from 4oz to 14oz, with custom printing options using eco-friendly inks.',
    imageId: 'prod-tote',
    images: [
      '/products/tote-bag/tote-bag-1.jpg',
      '/products/tote-bag/tote-bag-2.jpg',
      '/products/tote-bag/tote-bag-3.jpg',
      '/products/tote-bag/tote-bag-4.jpg'
    ],
    features: ['100% Organic Cotton', 'Reinforced Stitching', 'Custom Printing Available', 'Multiple Size Variants'],
    specs: [
      { label: 'Material', value: 'Canvas, Cotton, Recycled Polyester' },
      { label: 'Weight Range', value: '120 GSM to 450 GSM' },
      { label: 'Handle Type', value: 'Self-fabric, Webbing, Padded' },
      { label: 'MOQ', value: '500 Units' }
    ]
  },
  {
    id: 'prod-linen',
    slug: 'bed-linen',
    title: 'Bed Linen',
    description: 'Premium luxury comfort for a restful sleep, used by global hospitality brands.',
    longDescription: 'Experience the ultimate in comfort with our premium bed linen collection. We specialize in high thread count fabrics, including Percale, Satin, and Twill weaves. Our linens are OEKO-TEX certified, ensuring they are free from harmful substances and provide a breathable, hypoallergenic sleep environment.',
    imageId: 'prod-linen',
    images: [
      '/products/bed-linen/bed-linen-1.jpg',
      '/products/bed-linen/bed-linen-2.jpg',
      '/products/bed-linen/bed-linen-3.jpg',
      '/products/bed-linen/bed-linen-4.jpg'
    ],
    features: ['High Thread Count (200-1000 TC)', 'Anti-Pilling Finish', 'OEKO-TEX Certified', 'Hospitality Grade Durability'],
    specs: [
      { label: 'Fabric', value: '100% Combed Cotton, Giza Cotton' },
      { label: 'Weave', value: 'Percale, Sateen, Stripe Sateen' },
      { label: 'Sizes', value: 'Twin, Full, Queen, King, Custom' },
      { label: 'Finish', value: 'Bio-wash, Mercerized' }
    ]
  },
  {
    id: 'prod-cushion',
    slug: 'cushion-covers',
    title: 'Cushion Covers',
    description: 'Elegant designs to uplift your interiors with texture and sophistication.',
    longDescription: 'Our cushion covers bring life to any space. From minimalist solids to intricate jacquards and digital prints, we offer an extensive range of designs. Our facility in Karur uses precision cutting and state-of-the-art embroidery machines to deliver covers that meet international aesthetic standards.',
    imageId: 'prod-cushion',
    images: [
      '/products/cushion-covers/cushion-cover-1.jpg',
      '/products/cushion-covers/cushion-cover-2.jpg',
      '/products/cushion-covers/cushion-cover-3.jpg',
      '/products/cushion-covers/cushion-cover-4.jpg'
    ],
    features: ['Intricate Embroidery', 'Hidden Zipper Closures', 'Texture Play (Waffle, Slub)', 'Digital & Screen Printing'],
    specs: [
      { label: 'Fabrics', value: 'Cotton, Linen Blend, Velvet, Silk' },
      { label: 'Standard Sizes', value: '40x40cm, 45x45cm, 50x50cm' },
      { label: 'Embellishments', value: 'Tassels, Pompoms, Piping' },
      { label: 'Color Fastness', value: 'Grade 4-5' }
    ]
  },
  {
    id: 'prod-table',
    slug: 'table-bath',
    title: 'Table & Bath',
    description: 'Soft textures and absorbent textiles for your lifestyle and home needs.',
    longDescription: 'High-absorbency towels and sophisticated table settings define our Table & Bath collection. We use zero-twist and low-twist yarn technologies to ensure maximum softness in our towels, while our table linens feature soil-release finishes for easy maintenance in commercial environments.',
    imageId: 'prod-table',
    images: [
      '/products/bath-table/bath-table.jpg',
      '/products/bath-table/bath-towel-table_1373-55.jpg',
      '/products/bath-table/table-and-bath-towel-1.jpg',
      '/products/bath-table/table-and-bath-towel-2.jpg'
    ],
    features: ['High Absorbency', 'Soil-Release Finish', 'Quick-Dry Technology', 'Fade-Resistant Colors'],
    specs: [
      { label: 'Towel GSM', value: '300 to 800 GSM' },
      { label: 'Table Fabric', value: 'Damask, Plain Weave, Linen Look' },
      { label: 'Bath Types', value: 'Hand, Face, Bath, Pool, Gym' },
      { label: 'Edge Type', value: 'Dobby Border, Fringed' }
    ]
  },
  {
    id: 'prod-baby',
    slug: 'baby-garments',
    title: 'Baby Garments',
    description: 'Gently crafted organic cotton wear designed for the sensitive skin of infants.',
    longDescription: 'Safety and softness are the core of our baby garment division. Every garment is made with interlock or rib knit fabrics to provide gentle elasticity and breathability. We use lead-free snaps and nickel-free hardware, ensuring every piece meets global child safety standards.',
    imageId: 'prod-baby',
    images: [
      '/products/baby/baby-garments-2.jpg',
      '/products/baby/baby-garments-3.jpg',
      '/products/baby/baby-garments-4.jpg',
      '/products/baby/baby-garments.jpg'
    ],
    features: ['GOTS Certified Cotton', 'Lead-Free Snaps', 'Flat-Lock Seams', 'Chemical-Free Dyes'],
    specs: [
      { label: 'Age Group', value: '0-24 Months' },
      { label: 'Fabrics', value: 'Interlock, Rib, Muslin' },
      { label: 'Style Types', value: 'Onesies, Rompers, Sleepsuits' },
      { label: 'Print Type', value: 'Azo-Free Pigment' }
    ]
  },
  {
    id: 'prod-girls',
    slug: 'girls-collection',
    title: "Girls' Collection",
    description: 'Trendy, colorful, and comfortable fashion for the next generation.',
    longDescription: 'Our girls\' collection balances playful designs with functional comfort. Using breathable cotton and lightweight blends, we create dresses, tops, and sets that withstand the activity of children while maintaining their vibrant colors through multiple washes.',
    imageId: 'prod-girls',
    images: [
      '/products/girls/girl-collection-1.jpg',
      '/products/girls/girl-collection-2.jpg',
      '/products/girls/girl-collection-3.jpg',
      '/products/girls/girl-collection-4.jpg'
    ],
    features: ['Vibrant Prints', 'Breathable Knits', 'Easy-Care Fabrics', 'Comfort-Fit Designs'],
    specs: [
      { label: 'Size Range', value: '2-14 Years' },
      { label: 'Materials', value: 'Cotton Jersey, Cambric, Voile' },
      { label: 'Work', value: 'Appliqué, Embroidery, Printing' },
      { label: 'Closure', value: 'Back Zip, Elasticated, Buttons' }
    ]
  },
  {
    id: 'prod-boys',
    slug: 'boys-collection',
    title: "Boys' Collection",
    description: 'Durable, cool, and dynamic outfits for active boys and explorers.',
    longDescription: 'Built for play, our boys\' collection emphasizes durability and style. We use high-tensile strength yarns and reinforced stitching in high-stress areas. From classic polos to casual tees and shorts, our garments provide the freedom of movement required for active lifestyles.',
    imageId: 'prod-boys',
    images: [
      '/products/boys/boys-cloth-2.jpg',
      '/products/boys/boys-cloth-3.jpg',
      '/products/boys/boys-cloth.jpg',
      '/products/boys/boys-cloth4.jpg'
    ],
    features: ['Reinforced Seams', 'High Tensile Strength', 'Graphic Prints', 'Moisture-Wicking Options'],
    specs: [
      { label: 'Size Range', value: '2-14 Years' },
      { label: 'Fabrics', value: 'Piqué, Single Jersey, Twill' },
      { label: 'Themes', value: 'Nautical, Urban, Sports, Nature' },
      { label: 'Testing', value: 'Wash & Wear Tested' }
    ]
  },
  {
    id: 'prod-gents',
    slug: 'gents-shirts',
    title: "Gents' Shirts",
    description: 'Sophisticated formal and casual wear for the modern gentleman.',
    longDescription: 'Quality is in the details of our gents\' shirt collection. We focus on precision tailoring, collar stiffness, and cuff finish. Whether it is a formal office shirt or a relaxed linen casual, our garments reflect the craftsmanship developed over three decades in the industry.',
    imageId: 'prod-gents',
    images: [
      '/products/men-shirt/gents-shirt-2.jpg',
      '/products/men-shirt/gents-shirt-3.jpg',
      '/products/men-shirt/gents-shirt-4.jpg',
      '/products/men-shirt/gents-shirt.jpg'
    ],
    features: ['Precision Tailoring', 'Premium Collar Stays', 'Single Needle Stitching', 'Wrinkle-Resistant Finish'],
    specs: [
      { label: 'Fit', value: 'Slim, Regular, Athletic' },
      { label: 'Fabric', value: 'Poplin, Oxford, Chambray, Linen' },
      { label: 'Pattern', value: 'Solids, Checks, Stripes, Prints' },
      { label: 'Button Type', value: 'Mother of Pearl, Resin, Wood' }
    ]
  }
];
