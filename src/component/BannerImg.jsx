import { Link } from 'react-router-dom';

const BannerImg = ({ imageSrc, link, alt, title, buttonText }) => (
  <div className="w-full relative rounded-lg overflow-hidden last:hidden lg:last:block transition-shadow ease-in-out transform hover:scale-105 hover:shadow-2xl">
    <Link className="w-full block" to={link}>
      <img className="w-full h-full" src={imageSrc} alt={alt} />
      <div className="absolute top-10 left-10 max-w-[215px] sm:max-w-[240px] md:max-w-[215px]">
        <h2 className="text-[18px] sm:text-[20px] lg:text-[25px] text-[#253d4e] font-bold leading-8 mb-5">
          {title}
        </h2>
        <button className="text-white bg-green-600 px-3 py-1 rounded text-sm">{buttonText} →</button>
      </div>
    </Link>
  </div>
);

export default BannerImg;
