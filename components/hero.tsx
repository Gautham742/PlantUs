import Image from 'next/image'
import Button from './button'

const Hero = () => {
  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
      <div className="hero-map" />
      <Image className='absolute inset-0 object-cover w-full h-100 group-hover:opacity-50'
        src="/wallpaper.svg"
        alt='wall'
        width={1080}
        height={1000}
        />
      <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">

        <h1 className="bold-52 text-white lg:bold-88 mt-2">PlantUs</h1>
        <p className="regular-16 mt-6 text-slate-300 xl:max-w-[520px]">
        Have you ever brought home a beautiful plant but forgotten its name or how to care for it? <br/>Plantus is here to help!

Identify mystery plants with our easy-to-use photo recognition tool.

Learn everything you need to know about your plant - watering needs, sunlight requirements, common problems, and more.<br/>

Become a plant pro with Plantus by your side
        </p>

        <div className="flex flex-col w-full gap-3 sm:flex-row mt-5">
          <Button 
            type="button" 
            title="How we work?" 
            icon="/play.svg"
            variant="btn_green" 
            href='/aboutus'
          />
        </div>
      </div>
    </section>
  );
}

export default Hero