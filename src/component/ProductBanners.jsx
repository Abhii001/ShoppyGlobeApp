import BannerImg from './BannerImg';

const banners = [
    {
        imageSrc: 'src/assets/banner-1.png',
        link: '/product-category/vegatebles',
        alt: 'Banner 1',
        title: 'Everyday Fresh & Clean with Our Products',
        buttonText: 'Shop Now',
    },
    {
        imageSrc: 'src/assets/banner-2.png',
        link: '/product-category/Milks-And-Dairies',
        alt: 'Banner 2',
        title: 'Make your Breakfast Healthy and Easy',
        buttonText: 'Shop Now',
    },
    {
        imageSrc: 'src/assets/banner-3.png',
        link: '/product-category/vegatebles',
        alt: 'Banner 3',
        title: 'The Organic Product Online',
        buttonText: 'Shop Now',
    },
];

const ProductBanners = () => (
    <div className="py-4" style={{ opacity: 1, transform: 'none' }}>
        <div className="w-[85%] max-w-8xl mx-auto px-4 2xl:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 top-2">
                {banners.map((banner, index) => (
                    <BannerImg
                        key={index}
                        imageSrc={banner.imageSrc}
                        link={banner.link}
                        alt={banner.alt}
                        title={banner.title}
                        buttonText={banner.buttonText}
                    />
                ))}
            </div>
        </div>
    </div>
);

export default ProductBanners;
