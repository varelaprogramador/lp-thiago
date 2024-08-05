import Image from "next/image";
import bannerMain from "./assets/banner-part-1-yt.png"
import bannerMain2 from "./assets/banner-part-2.png"
import fotoThiago from "./assets/img-thiago.png"
import carousel from "./assets/carousel-aulas.png"
import logoyt from "./assets/logo-yt.png"
import fundoCelular from './assets/fundo-celular.png'
import celular from './assets/CELULAR.png'
import Link from "next/link";
import { Imprima, Sora } from "next/font/google";
const sora = Sora({
  subsets: ['latin'],
  weight: '400', // Especifica o peso da fonte
});

const targetDate = new Date('2024-08-16');
const datenow = new Date();
// Calcule a diferença em milissegundos
const differenceInTime = targetDate.getTime() - datenow.getTime();

// Converta a diferença de milissegundos para dias
const days = Math.round(differenceInTime / (1000 * 3600 * 24));
console.log(`quantidade de dias restantes ${days}`);


export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center bg-gray-900 justify-between text-white ${sora.className}`}>
      <section className=" pb-[40px] w-full min-h-[500px] flex flex-wrap bg-cover bg-center p-12"
        style={{ backgroundImage: `url(${bannerMain.src})` }}>
        <div className=" w-[50%] flex flex-col gap-4 justify-center   pl-[15%] max-sm:w-full max-sm:pl-7 ">
          <Image src={logoyt}
            quality={100}
            alt="logo"
            className="w-[160px] h-[110px]"
          ></Image>
          <h1 className=" text-[3rem] max-lg:text-[2rem] ">
            Vale a pena <span className="text-cyan-400">larga seu emprego  </span> para<br /><span className="bg-red-600 text-white font-bold p-1">SER YOUTUBER?</span>
          </h1>
          <p className=" text-[1rem] text-gray-300 min-[1200px]:w-[90%]">
            Um curso completo para você começar do zero e se
            tornar um Youtuber de sucesso!
          </p>
          <Link href={"#"}>
            <button className="bg-cyan-400 text-2xl text-white font-black rounded-md p-2">
              quero aprender
            </button>
          </Link>

        </div>
        <div className=" w-[50%] flex items-end max-sm:hidden ">
          <div className="w-full">
            <Image
              quality={100}
              className="w-full "
              src={fotoThiago}
              alt="foto do thiago"
            ></Image>
          </div>

        </div>
      </section>
      <section className=" pb-[40px] pt-5 w-full min-h-[500px] flex bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerMain2.src})` }}>
        <div className=" w-full flex flex-col gap-4 items-center ">

          <h2 className=" text-[3rem] max-sm:text-[2rem]  text-center pt-16">
            Um curso para <br /> <span className=" font-bold">você aprender do zero! </span>
          </h2>

          <Link href={"#"}>
            <button className="bg-cyan-400 text-2xl text-white font-black rounded-md p-2">
              entrar para o grupo
            </button>
          </Link>

        </div>

      </section>
      <section className=" pb-[150px] pt-5 w-full min-h-[500px] flex bg-black"
      >
        <div className=" w-full flex flex-col gap-[60px] items-center ">

          <h2 className=" text-[3rem] max-sm:text-[2rem] text-center pt-16">
            O que você <br /> <span className=" font-bold">vai aprender? </span>
          </h2>

          <Image
            src={carousel}
            quality={100}
            className="w-full bg-cover"
            alt="carrousel-aulas"
          ></Image>


          <Link href={"#"}>
            <button className="bg-cyan-400 text-2xl text-white font-black rounded-md p-2">
              entrar para o grupo
            </button>
          </Link>

        </div>

      </section>
      <section className="min-[1000px]:pb-[150px] pt-5 w-full min-h-[500px] flex flex-wrap bg-black">
        <div className=" w-[50%] flex flex-col gap-4 justify-center pl-40 max-lg:w-full max-lg:p-8">
          <Image src={logoyt}
            quality={100}
            alt="logo"
            className="w-[160px] h-[110px]"
          ></Image>
          <h2 className=" text-[3rem] max-sm:text-[2rem] ">
            <span className="text-cyan-400">Ficou Interessado? <br /></span>Entre no <span className=" text-white font-bold p-1">grupo VIP</span> para garantir sua vaga em primeira mão
          </h2>

          <Link href={"#"}>
            <button className="bg-cyan-400 text-2xl text-white font-black rounded-md p-2">
              entrar para o grupo
            </button>
          </Link>

        </div>
        <div className=" max-lg:w-full  flex justify-end  bg-cover bg-right"

          style={{ backgroundImage: `url(${fundoCelular.src})` }}>
          <Image
            quality={100}
            src={celular}
            className="w-[350px] max-sm:w-[250px] "
            alt="celular"
          ></Image>

        </div>
      </section>
      <section className=" pb-[40px]pt-5  w-full min-h-[500px] flex justify-center bg-cyan-400 p-24 max-sm:p-10 text-black">
        <div className="flex flex-row max-lg:flex-col   h-fit border border-black rounded-md p-24 gap-[50px] max-sm:p-6">
          <div className="w-[50%] flex  justify-center items-center p-1 max-lg:w-full">
            <h2 className=" text-[3rem] max-sm:text-[2rem]  ">
              Faltam poucos dias para <span className="bg-red-600  font-bold p-1">abrirem as vagas</span>
            </h2>

          </div>
          <div className="w-[50%] gap-5  flex  justify-center items-center max-lg:w-full max-sm:h-fit p-1">
            <div className="bg-white flex items-center justify-center p-11 max-sm:w-auto max-sm:p-[15px] max-sm:h-auto  rounded-md">
              <h2 className="text-[80px] max-lg:text-[60px] max-sm:text-[55px] font-black">{days}</h2>
            </div>
            <h2 className="text-[80px] max-lg:text-[60px] max-sm:text-[55px] max-sm:h-auto font-black p-6">
              :
            </h2>
            <div className="bg-white p-11 flex items-center justify-center   max-sm:w-auto max-sm:p-[15px] max-sm:h-auto  rounded-md">
              <h2 className="text-[80px] max-lg:text-[60px] max-sm:text-[55px] font-black">D</h2>
            </div>

          </div>

        </div>

      </section>



    </main>
  );
}
