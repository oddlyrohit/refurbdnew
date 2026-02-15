import { PrismaClient, ProductGrade, StorageType, ProductStatus } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.wishlistItem.deleteMany();
  await prisma.review.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.seller.deleteMany();
  await prisma.promoCode.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  console.log("Cleaned existing data.");

  // --- Admin User ---
  const adminPassword = await hash("admin123", 12);
  const admin = await prisma.user.create({
    data: {
      email: "admin@refurbd.com.au",
      passwordHash: adminPassword,
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });
  console.log("Created admin user:", admin.email);

  // --- Categories ---
  const laptops = await prisma.category.create({
    data: {
      name: "Laptops",
      slug: "laptops",
      description: "Refurbished laptops from top brands. Ultrabooks, workstations, and everyday laptops.",
      sortOrder: 1,
    },
  });

  const desktops = await prisma.category.create({
    data: {
      name: "Desktops",
      slug: "desktops",
      description: "Refurbished desktop PCs. Towers, small form factors, and all-in-ones.",
      sortOrder: 2,
    },
  });
  console.log("Created categories.");

  // --- Brands ---
  const brandData = [
    { name: "Dell", slug: "dell" },
    { name: "HP", slug: "hp" },
    { name: "Lenovo", slug: "lenovo" },
    { name: "Apple", slug: "apple" },
    { name: "ASUS", slug: "asus" },
    { name: "Acer", slug: "acer" },
    { name: "Microsoft", slug: "microsoft" },
  ];

  const brands: Record<string, string> = {};
  for (const b of brandData) {
    const brand = await prisma.brand.create({ data: b });
    brands[b.slug] = brand.id;
  }
  console.log("Created brands.");

  // --- Sellers ---
  const seller1 = await prisma.seller.create({
    data: {
      code: "SEL-001",
      businessName: "TechRenew Sydney",
      contactName: "David Chen",
      email: "david@techrenew.com.au",
      phone: "0412345678",
      abn: "12345678901",
      commissionRate: 15.0,
      bankBsb: "062-000",
      bankAccount: "12345678",
      bankName: "Commonwealth Bank",
      notes: "Primary laptop supplier. Sydney warehouse.",
    },
  });

  const seller2 = await prisma.seller.create({
    data: {
      code: "SEL-002",
      businessName: "GreenIT Melbourne",
      contactName: "Sarah Williams",
      email: "sarah@greenit.com.au",
      phone: "0423456789",
      abn: "23456789012",
      commissionRate: 12.5,
      bankBsb: "033-000",
      bankAccount: "87654321",
      bankName: "Westpac",
      notes: "Specialises in corporate lease returns. Melbourne.",
    },
  });

  const seller3 = await prisma.seller.create({
    data: {
      code: "SEL-003",
      businessName: "PCycle NZ",
      contactName: "Tom Mitchell",
      email: "tom@pcycle.co.nz",
      phone: "+64211234567",
      nzbn: "9429041234567",
      commissionRate: 18.0,
      bankName: "ANZ NZ",
      notes: "New Zealand supplier. Desktop specialist.",
    },
  });
  console.log("Created sellers.");

  // --- Products ---
  const products = [
    // Laptops
    {
      sku: "RFB-LAP-DEL-5520-001",
      sellerProductCode: "TR-DEL-5520-A",
      slug: "dell-latitude-5520-15-i7-16gb-512gb-ssd",
      title: 'Dell Latitude 5520 15.6" i7-1185G7 16GB 512GB SSD',
      shortDescription: "Powerful business laptop with 11th Gen Intel i7, 16GB RAM, and fast 512GB SSD. Perfect for professionals.",
      description: "The Dell Latitude 5520 is a premium business-class laptop featuring an 11th Gen Intel Core i7-1185G7 processor, 16GB DDR4 RAM, and a speedy 512GB NVMe SSD. The 15.6-inch Full HD display delivers crisp visuals for productivity. Built for enterprise use, it includes a fingerprint reader, IR camera, and Thunderbolt 4 ports. This unit has been thoroughly tested and certified to Excellent grade.",
      grade: ProductGrade.EXCELLENT,
      price: 899,
      costPrice: 520,
      compareAtPrice: 1899,
      processor: "Intel Core i7-1185G7",
      ramGb: 16,
      storageGb: 512,
      storageType: StorageType.SSD,
      screenSizeInch: 15.6,
      gpu: "Intel Iris Xe",
      operatingSystem: "Windows 11 Pro",
      batteryHealth: 88,
      weight: "1.79 kg",
      ports: "2x Thunderbolt 4, 1x USB-A 3.2, HDMI 2.0, microSD, 3.5mm audio",
      modelYear: 2021,
      stockQuantity: 5,
      categoryId: laptops.id,
      brandId: brands["dell"],
      sellerId: seller1.id,
      status: ProductStatus.ACTIVE,
      isFeatured: true,
      conditionDesc: "Minimal signs of use. Very light marks on the lid, barely visible. Screen is flawless. Keyboard shows no shine. Battery health at 88%.",
    },
    {
      sku: "RFB-LAP-HP-840G8-001",
      sellerProductCode: "GI-HP-840-B",
      slug: "hp-elitebook-840-g8-14-i5-16gb-256gb-ssd",
      title: 'HP EliteBook 840 G8 14" i5-1145G7 16GB 256GB SSD',
      shortDescription: "Compact and secure business laptop. 14-inch display, 11th Gen i5, ideal for mobile professionals.",
      description: "The HP EliteBook 840 G8 combines portability with enterprise-grade security. Powered by an 11th Gen Intel Core i5-1145G7 with 16GB RAM and 256GB SSD. The 14-inch Full HD display is perfect for on-the-go productivity. Features HP Sure View privacy screen, fingerprint reader, and MIL-STD 810H durability certification.",
      grade: ProductGrade.GOOD,
      price: 749,
      costPrice: 420,
      compareAtPrice: 1599,
      processor: "Intel Core i5-1145G7",
      ramGb: 16,
      storageGb: 256,
      storageType: StorageType.SSD,
      screenSizeInch: 14.0,
      gpu: "Intel Iris Xe",
      operatingSystem: "Windows 11 Pro",
      batteryHealth: 82,
      weight: "1.34 kg",
      ports: "2x Thunderbolt 4, 2x USB-A 3.1, HDMI 2.0, 3.5mm audio",
      modelYear: 2021,
      stockQuantity: 3,
      categoryId: laptops.id,
      brandId: brands["hp"],
      sellerId: seller2.id,
      status: ProductStatus.ACTIVE,
      isFeatured: true,
      conditionDesc: "Minor cosmetic wear on corners and palm rest. Small scratch on lid (2cm). Screen in perfect condition. Fully functional.",
    },
    {
      sku: "RFB-LAP-LEN-X1C9-001",
      sellerProductCode: "TR-LEN-X1C9-A",
      slug: "lenovo-thinkpad-x1-carbon-gen9-14-i7-16gb-512gb",
      title: 'Lenovo ThinkPad X1 Carbon Gen 9 14" i7-1165G7 16GB 512GB SSD',
      shortDescription: "Ultra-lightweight premium ultrabook. Carbon fibre build, legendary ThinkPad keyboard, all-day battery.",
      description: "The ThinkPad X1 Carbon Gen 9 is Lenovo's flagship ultrabook. Weighing just 1.13kg with a stunning 14-inch WUXGA display. Powered by Intel Core i7-1165G7, 16GB LPDDR4x, and 512GB PCIe SSD. Features the legendary ThinkPad keyboard, TrackPoint, and up to 16 hours of battery life. This unit is Certified Refurbished — virtually indistinguishable from new.",
      grade: ProductGrade.CERTIFIED_REFURBISHED,
      price: 1099,
      costPrice: 680,
      compareAtPrice: 2499,
      processor: "Intel Core i7-1165G7",
      ramGb: 16,
      storageGb: 512,
      storageType: StorageType.SSD,
      screenSizeInch: 14.0,
      gpu: "Intel Iris Xe",
      operatingSystem: "Windows 11 Pro",
      batteryHealth: 96,
      weight: "1.13 kg",
      ports: "2x Thunderbolt 4, 2x USB-A 3.2, HDMI 2.0, 3.5mm audio",
      modelYear: 2021,
      stockQuantity: 2,
      categoryId: laptops.id,
      brandId: brands["lenovo"],
      sellerId: seller1.id,
      status: ProductStatus.ACTIVE,
      isFeatured: true,
      conditionDesc: "Like new condition. No visible marks or scratches. Comes in original packaging with all accessories. Battery health 96%.",
    },
    {
      sku: "RFB-LAP-APL-MBA-M1-001",
      sellerProductCode: "TR-APL-MBA-M1",
      slug: "apple-macbook-air-m1-13-8gb-256gb-ssd",
      title: 'Apple MacBook Air M1 13.3" 8GB 256GB SSD (2020)',
      shortDescription: "Apple's revolutionary M1 chip delivers incredible performance and all-day battery life in a fanless design.",
      description: "The MacBook Air with Apple M1 chip delivers breakthrough performance with up to 18 hours of battery life. The fanless design means silent operation. Features a 13.3-inch Retina display with P3 wide colour, 8GB unified memory, and 256GB SSD. Touch ID for secure authentication. This is a fantastic machine for everyday use, creative work, and even light video editing.",
      grade: ProductGrade.EXCELLENT,
      price: 849,
      costPrice: 550,
      compareAtPrice: 1499,
      processor: "Apple M1",
      ramGb: 8,
      storageGb: 256,
      storageType: StorageType.SSD,
      screenSizeInch: 13.3,
      gpu: "Apple M1 (7-core GPU)",
      operatingSystem: "macOS",
      batteryHealth: 91,
      weight: "1.29 kg",
      ports: "2x Thunderbolt / USB 4, 3.5mm audio",
      modelYear: 2020,
      stockQuantity: 4,
      categoryId: laptops.id,
      brandId: brands["apple"],
      sellerId: seller1.id,
      status: ProductStatus.ACTIVE,
      isFeatured: true,
      conditionDesc: "Excellent condition. Very faint mark on bottom case, not visible during use. Screen and keyboard perfect. Battery cycle count: 87, health at 91%.",
    },
    {
      sku: "RFB-LAP-HP-450G8-001",
      sellerProductCode: "GI-HP-450-C",
      slug: "hp-probook-450-g8-15-i5-8gb-256gb-ssd",
      title: 'HP ProBook 450 G8 15.6" i5-1135G7 8GB 256GB SSD',
      shortDescription: "Affordable business laptop with 11th Gen i5. Great value for office work and everyday computing.",
      description: "The HP ProBook 450 G8 is a reliable workhorse for business and education. 11th Gen Intel Core i5-1135G7, 8GB DDR4, and 256GB SSD. The 15.6-inch Full HD anti-glare display is easy on the eyes for long work sessions. Features a spill-resistant keyboard, fingerprint reader, and HP Wolf Security.",
      grade: ProductGrade.FAIR,
      price: 549,
      costPrice: 280,
      compareAtPrice: 1199,
      processor: "Intel Core i5-1135G7",
      ramGb: 8,
      storageGb: 256,
      storageType: StorageType.SSD,
      screenSizeInch: 15.6,
      gpu: "Intel Iris Xe",
      operatingSystem: "Windows 11 Pro",
      batteryHealth: 75,
      weight: "1.74 kg",
      ports: "1x USB-C, 2x USB-A 3.1, HDMI 1.4b, RJ-45, 3.5mm audio",
      modelYear: 2021,
      stockQuantity: 8,
      categoryId: laptops.id,
      brandId: brands["hp"],
      sellerId: seller2.id,
      status: ProductStatus.ACTIVE,
      isFeatured: true,
      conditionDesc: "Noticeable wear on palm rest and corners. Light scratches on lid. Screen has no dead pixels. All ports and functions working. Battery health 75%.",
    },
    {
      sku: "RFB-LAP-LEN-T14-001",
      sellerProductCode: "GI-LEN-T14-B",
      slug: "lenovo-thinkpad-t14-gen2-14-i5-16gb-512gb",
      title: 'Lenovo ThinkPad T14 Gen 2 14" i5-1145G7 16GB 512GB SSD',
      shortDescription: "Rock-solid business laptop with MIL-SPEC durability. ThinkPad reliability meets modern performance.",
      description: "The ThinkPad T14 Gen 2 is a workhorse built for business. Intel Core i5-1145G7, 16GB RAM, 512GB SSD, and a 14-inch Full HD display with low power technology. MIL-STD 810H certified for durability. Features the iconic ThinkPad keyboard, TrackPoint, and extensive port selection.",
      grade: ProductGrade.GOOD,
      price: 799,
      costPrice: 450,
      compareAtPrice: 1699,
      processor: "Intel Core i5-1145G7",
      ramGb: 16,
      storageGb: 512,
      storageType: StorageType.SSD,
      screenSizeInch: 14.0,
      gpu: "Intel Iris Xe",
      operatingSystem: "Windows 11 Pro",
      batteryHealth: 85,
      weight: "1.47 kg",
      ports: "2x USB-C (Thunderbolt 4), 2x USB-A 3.2, HDMI 2.0, RJ-45, 3.5mm audio",
      modelYear: 2021,
      stockQuantity: 4,
      categoryId: laptops.id,
      brandId: brands["lenovo"],
      sellerId: seller2.id,
      status: ProductStatus.ACTIVE,
      conditionDesc: "Minor scuff marks on corners. Light wear on trackpad surface. Screen and keyboard in great condition.",
    },
    {
      sku: "RFB-LAP-DEL-INS15-001",
      sellerProductCode: "TR-DEL-INS-D",
      slug: "dell-inspiron-15-3520-i3-8gb-256gb-ssd",
      title: 'Dell Inspiron 15 3520 15.6" i3-1215U 8GB 256GB SSD',
      shortDescription: "Budget-friendly laptop for students and everyday use. 12th Gen i3 with all-day battery.",
      description: "The Dell Inspiron 15 is perfect for students and home use. 12th Gen Intel Core i3-1215U, 8GB DDR4, 256GB SSD, and a 15.6-inch Full HD display. Lightweight and portable with good battery life. Great for web browsing, office work, and streaming.",
      grade: ProductGrade.ACCEPTABLE,
      price: 349,
      costPrice: 160,
      compareAtPrice: 799,
      processor: "Intel Core i3-1215U",
      ramGb: 8,
      storageGb: 256,
      storageType: StorageType.SSD,
      screenSizeInch: 15.6,
      gpu: "Intel UHD Graphics",
      operatingSystem: "Windows 11 Home",
      batteryHealth: 68,
      weight: "1.85 kg",
      ports: "1x USB-C 3.2, 2x USB-A 3.2, HDMI 1.4, SD card, 3.5mm audio",
      modelYear: 2022,
      stockQuantity: 10,
      categoryId: laptops.id,
      brandId: brands["dell"],
      sellerId: seller1.id,
      status: ProductStatus.ACTIVE,
      conditionDesc: "Significant cosmetic wear. Visible scratches on lid and palm rest. Small dent on one corner. Screen works perfectly, no dead pixels. All functions operational. Battery health 68%.",
    },
    {
      sku: "RFB-LAP-ASUS-ZB14-001",
      sellerProductCode: "TR-ASUS-ZB14-A",
      slug: "asus-zenbook-14-um425-ryzen5-16gb-512gb",
      title: 'ASUS ZenBook 14 UM425 14" Ryzen 5 5500U 16GB 512GB SSD',
      shortDescription: "Sleek ultrabook with AMD Ryzen 5. Ultra-slim design with NumberPad 2.0 touchpad.",
      description: "The ASUS ZenBook 14 combines style with substance. AMD Ryzen 5 5500U, 16GB LPDDR4X, 512GB PCIe SSD, and a stunning 14-inch Full HD NanoEdge display. The ultra-slim aluminium chassis weighs just 1.22 kg. Features the innovative NumberPad 2.0 LED-illuminated numeric keypad built into the touchpad.",
      grade: ProductGrade.EXCELLENT,
      price: 699,
      costPrice: 380,
      compareAtPrice: 1399,
      processor: "AMD Ryzen 5 5500U",
      ramGb: 16,
      storageGb: 512,
      storageType: StorageType.SSD,
      screenSizeInch: 14.0,
      gpu: "AMD Radeon Graphics",
      operatingSystem: "Windows 11 Home",
      batteryHealth: 92,
      weight: "1.22 kg",
      ports: "1x USB-C 3.2 Gen 2, 1x USB-A 3.2, HDMI 2.0, microSD, 3.5mm audio",
      modelYear: 2021,
      stockQuantity: 3,
      categoryId: laptops.id,
      brandId: brands["asus"],
      sellerId: seller1.id,
      status: ProductStatus.ACTIVE,
      conditionDesc: "Barely used. Faintest hairline mark on bottom, invisible during normal use. Screen, keyboard, and touchpad pristine.",
    },
    // Desktops
    {
      sku: "RFB-DSK-DEL-7080-001",
      sellerProductCode: "GI-DEL-7080-A",
      slug: "dell-optiplex-7080-sff-i7-10700-16gb-512gb-ssd",
      title: "Dell OptiPlex 7080 SFF i7-10700 16GB 512GB SSD",
      shortDescription: "Enterprise-grade small form factor desktop. Perfect for office environments.",
      description: "The Dell OptiPlex 7080 Small Form Factor is built for business. 10th Gen Intel Core i7-10700 (8 cores, up to 4.8GHz), 16GB DDR4, and 512GB NVMe SSD deliver excellent performance in a compact chassis. Features vPro manageability, extensive expansion options, and whisper-quiet operation.",
      grade: ProductGrade.GOOD,
      price: 599,
      costPrice: 320,
      compareAtPrice: 1299,
      processor: "Intel Core i7-10700",
      ramGb: 16,
      storageGb: 512,
      storageType: StorageType.SSD,
      operatingSystem: "Windows 11 Pro",
      weight: "5.26 kg",
      dimensions: "29.0 x 9.3 x 29.2 cm",
      ports: "4x USB-A 3.2, 2x USB-A 2.0, 1x USB-C 3.2, 2x DisplayPort, 1x HDMI, RJ-45, 3.5mm audio",
      modelYear: 2020,
      stockQuantity: 7,
      categoryId: desktops.id,
      brandId: brands["dell"],
      sellerId: seller2.id,
      status: ProductStatus.ACTIVE,
      isFeatured: true,
      conditionDesc: "Light scuffs on top panel. All ports and internals in perfect working order. Comes with power cable.",
    },
    {
      sku: "RFB-DSK-HP-600G6-001",
      sellerProductCode: "PC-HP-600-A",
      slug: "hp-prodesk-600-g6-sff-i5-10500-8gb-256gb-ssd",
      title: "HP ProDesk 600 G6 SFF i5-10500 8GB 256GB SSD",
      shortDescription: "Reliable small form factor desktop for everyday business use. Compact and energy-efficient.",
      description: "The HP ProDesk 600 G6 is a reliable business desktop. Intel Core i5-10500 (6 cores), 8GB DDR4, and 256GB SSD. Small form factor fits in tight spaces. Features HP Wolf Security, Tool-Free access for easy maintenance, and support for up to three displays.",
      grade: ProductGrade.GOOD,
      price: 449,
      costPrice: 220,
      compareAtPrice: 999,
      processor: "Intel Core i5-10500",
      ramGb: 8,
      storageGb: 256,
      storageType: StorageType.SSD,
      operatingSystem: "Windows 11 Pro",
      weight: "5.7 kg",
      dimensions: "27.0 x 10.0 x 30.3 cm",
      ports: "4x USB-A 3.2, 2x USB-A 2.0, 1x USB-C, 2x DisplayPort, VGA, RJ-45, 3.5mm audio",
      modelYear: 2020,
      stockQuantity: 12,
      categoryId: desktops.id,
      brandId: brands["hp"],
      sellerId: seller3.id,
      status: ProductStatus.ACTIVE,
      conditionDesc: "Minor scuffs on case. Cleaned and tested. All components functioning perfectly.",
    },
    {
      sku: "RFB-DSK-LEN-M90Q-001",
      sellerProductCode: "PC-LEN-M90Q-A",
      slug: "lenovo-thinkcentre-m90q-tiny-i7-10700t-16gb-512gb",
      title: "Lenovo ThinkCentre M90q Tiny i7-10700T 16GB 512GB SSD",
      shortDescription: "Ultra-compact 1-litre PC. Mount behind a monitor for a clean desk setup.",
      description: "The ThinkCentre M90q Tiny packs enterprise performance into an incredibly compact 1-litre chassis. Intel Core i7-10700T, 16GB DDR4, 512GB SSD. Can be mounted behind a monitor with VESA bracket (included). Features Wi-Fi 6, Bluetooth 5.1, and Intel vPro. Perfect for space-constrained environments.",
      grade: ProductGrade.CERTIFIED_REFURBISHED,
      price: 699,
      costPrice: 400,
      compareAtPrice: 1499,
      processor: "Intel Core i7-10700T",
      ramGb: 16,
      storageGb: 512,
      storageType: StorageType.SSD,
      operatingSystem: "Windows 11 Pro",
      weight: "1.25 kg",
      dimensions: "18.2 x 17.9 x 3.6 cm",
      ports: "4x USB-A 3.2, 1x USB-C, 2x DisplayPort, HDMI, RJ-45, 3.5mm audio",
      modelYear: 2020,
      stockQuantity: 3,
      categoryId: desktops.id,
      brandId: brands["lenovo"],
      sellerId: seller3.id,
      status: ProductStatus.ACTIVE,
      conditionDesc: "Like-new condition. No visible marks. Comes with power adapter, VESA mount bracket, and original documentation.",
    },
    {
      sku: "RFB-DSK-DEL-3080-001",
      sellerProductCode: "GI-DEL-3080-C",
      slug: "dell-optiplex-3080-mt-i5-10505-8gb-1tb-hdd",
      title: "Dell OptiPlex 3080 Tower i5-10505 8GB 1TB HDD",
      shortDescription: "Full tower desktop with expandability. Budget-friendly with mechanical hard drive.",
      description: "The Dell OptiPlex 3080 Micro Tower offers expandability at a great price. Intel Core i5-10505, 8GB DDR4, and 1TB 7200RPM HDD. The tower form factor allows for easy upgrades — add an SSD, more RAM, or a dedicated GPU. A solid foundation for an office or home PC that can grow with your needs.",
      grade: ProductGrade.FAIR,
      price: 299,
      costPrice: 140,
      compareAtPrice: 749,
      processor: "Intel Core i5-10505",
      ramGb: 8,
      storageGb: 1000,
      storageType: StorageType.HDD,
      operatingSystem: "Windows 11 Pro",
      weight: "7.9 kg",
      dimensions: "32.4 x 15.4 x 29.0 cm",
      ports: "4x USB-A 3.2, 4x USB-A 2.0, 1x DisplayPort, 1x HDMI, VGA, RJ-45, 3.5mm audio",
      modelYear: 2020,
      stockQuantity: 15,
      categoryId: desktops.id,
      brandId: brands["dell"],
      sellerId: seller2.id,
      status: ProductStatus.ACTIVE,
      conditionDesc: "Visible wear on case — scratches on side panels and front bezel. Internals clean and well-maintained. All ports tested and working.",
    },
    {
      sku: "RFB-LAP-ACR-A515-001",
      sellerProductCode: "TR-ACR-A515-B",
      slug: "acer-aspire-5-a515-15-ryzen7-5700u-16gb-512gb",
      title: 'Acer Aspire 5 A515 15.6" Ryzen 7 5700U 16GB 512GB SSD',
      shortDescription: "Versatile all-rounder with powerful Ryzen 7. Great for work and entertainment.",
      description: "The Acer Aspire 5 delivers outstanding value with an AMD Ryzen 7 5700U (8 cores), 16GB DDR4, and 512GB SSD. The 15.6-inch Full HD IPS display has good colour accuracy. Backlit keyboard, fingerprint reader, and Wi-Fi 6 round out an excellent package for both work and casual gaming.",
      grade: ProductGrade.GOOD,
      price: 649,
      costPrice: 340,
      compareAtPrice: 1299,
      processor: "AMD Ryzen 7 5700U",
      ramGb: 16,
      storageGb: 512,
      storageType: StorageType.SSD,
      screenSizeInch: 15.6,
      gpu: "AMD Radeon Graphics",
      operatingSystem: "Windows 11 Home",
      batteryHealth: 84,
      weight: "1.76 kg",
      ports: "1x USB-C 3.2, 2x USB-A 3.2, 1x USB-A 2.0, HDMI 2.0, RJ-45, 3.5mm audio",
      modelYear: 2021,
      stockQuantity: 6,
      categoryId: laptops.id,
      brandId: brands["acer"],
      sellerId: seller1.id,
      status: ProductStatus.ACTIVE,
      conditionDesc: "Minor cosmetic wear on base. Light scratches on lid. Screen and keyboard in very good condition.",
    },
  ];

  for (const productData of products) {
    await prisma.product.create({
      data: productData,
    });
  }
  console.log(`Created ${products.length} products.`);

  // --- Promo Code ---
  await prisma.promoCode.create({
    data: {
      code: "WELCOME10",
      type: "FIXED_AMOUNT",
      value: 10,
      minOrderValue: 50,
      maxUses: 1000,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      isActive: true,
    },
  });
  console.log("Created promo code: WELCOME10");

  console.log("\nSeeding complete!");
  console.log("Admin login: admin@refurbd.com.au / admin123");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
