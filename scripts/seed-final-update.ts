import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import fs from 'fs'
import path from 'path'

const translations: Record<string, { title: string, desc: string }> = {
    'GRAND PAVILION L-SHAPE SUITE': {
        title: 'Гранд Павильон (L-образный блок)',
        desc: 'Массивная угловая металлическая конструкция для премиальных зон барбекю.'
    },
    'CAIRO LOFT STORAGE MODULE': {
        title: 'Модуль хранения "Cairo Loft"',
        desc: 'Надежный модуль для дров и инструмента из толстой стали с матовым покрытием.'
    },
    '"Grand Pavilion" L-Shape Suite': {
        title: 'Комплекс "Гранд Павильон"',
        desc: 'Просторная рабочая зона с навесом и максимальным функционалом для масштабных мероприятий.'
    },
    '"Cairo Loft" Storage Module': {
        title: 'Модуль хранения "Cairo Loft"',
        desc: 'Индустриальный модуль с глубокими ящиками для посуды и аксессуаров. Идеально комбинируется с другими блоками.'
    },
    '"Cairo Kitchen" 6-Module Station': {
        title: '6-модульная станция "Cairo Kitchen"',
        desc: 'Полноценная уличная кухня с интегрированной мойкой, разделочными зонами и грилем.'
    },
    '"Cairo Solo" Mobile Grill': {
        title: 'Мобильный гриль "Cairo Solo"',
        desc: 'Компактный и мощный гриль на усиленных колесах для гибкого позиционирования в саду.'
    },
    'Argentine-Style Grill': {
        title: 'Аргентинский гриль "Argentine Style"',
        desc: 'Классический открытый гриль с регулируемой по высоте решеткой и зоной для дров.'
    },
    'Cairo Pattern Complex': { title: 'Комплекс "Cairo Pattern"', desc: 'Уличный кухонный блок с фирменным лазерным узором.' },
    'Iron Residence Pavilion': { title: 'Беседка-павильон "Iron Residence"', desc: 'Массивная беседка из металла для защиты вашей кухни от осадков.' },
    'Argentine Master Grill Station': { title: 'Гриль-станция "Argentine Master"', desc: 'Профессиональная гриль-станция с увеличенной площадью готовки.' }
};

const images = [
    'prod_img_01_1772643294058.png',
    'prod_img_02_1772643310731.png',
    'prod_img_03_1772643326780.png',
    'prod_img_04_1772643344971.png',
    'prod_img_05_1772643361335.png',
    'prod_img_06_1772643383615.png',
    'prod_img_07_1772643399863.png',
    'prod_img_08_1772643417463.png',
    'prod_img_09_1772643433851.png',
    'prod_img_10_1772643448717.png'
];

async function run() {
    const payload = await getPayload({ config })
    const imgDir = 'C:\\Users\\Orion\\.gemini\\antigravity\\brain\\e3b78f10-360b-4d29-878d-989b58183e61'

    const productsRes = await payload.find({ collection: 'products', limit: 100 })
    let imgIdx = 0;

    for (const product of productsRes.docs) {
        console.log(`Processing product: ${product.title}`);

        let newTitle = product.title;
        let newDesc = product.description || '';

        Object.keys(translations).forEach(engKey => {
            if (product.title.toLowerCase().includes(engKey.toLowerCase())) {
                newTitle = translations[engKey].title;
                if (translations[engKey].desc) newDesc = translations[engKey].desc;
            }
        });

        // Ensure translation happens
        if (newTitle === product.title && !/[А-Яа-яЁё]/.test(product.title)) {
            newTitle = 'Модуль ' + product.title;
        }

        const imgName = images[imgIdx % images.length];
        const imgPath = path.join(imgDir, imgName);
        imgIdx++;

        if (!fs.existsSync(imgPath)) {
            console.error('Missing image', imgPath);
            continue;
        }

        console.log(`Uploading real media for ${newTitle}...`);
        const media = await payload.create({
            collection: 'media',
            data: { alt: newTitle },
            file: {
                data: fs.readFileSync(imgPath),
                mimetype: 'image/png',
                name: `real-img-${imgIdx}.png`,
                size: fs.statSync(imgPath).size,
            },
        });

        console.log(`Updating product ${product.id} -> ${newTitle}`);
        await payload.update({
            collection: 'products',
            id: product.id,
            data: {
                title: newTitle,
                description: newDesc,
                photo: media.id,
            },
        });
    }

    console.log('Done!');
    process.exit(0)
}

run().catch(console.error)
