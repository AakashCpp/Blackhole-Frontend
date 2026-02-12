import React, { useState } from "react";
import { motion } from "framer-motion";

function About() {
  const [isHovering, setIsHovering] = useState(false);
  const services = [
    {
      title: "AI Threat Detection",
      img: "/images/ai-threat.png",
    },
    {
      title: "Blockchain Security",
      img: "/images/blockchain.png",
    },
    {
      title: "Web3 Audits",
      img: "/images/web3.png",
    },
    {
      title: "Dark Web Monitoring",
      img: "/images/darkweb.png",
    },
    {
      title: "Zero Trust Systems",
      img: "/images/zerotrust.png",
    },
  ];

  return (
    <>
      <div className="min-h-screen w-full">
        <div className="h-full w-full py-10">
          <div className="h-96 w-full flex justify-between gap-10 p-4">
            <div className="h-full w-1/2">
              <div className="border-b border-zinc-500 w-1/2">
                <h1 className="font-bold tracking-wider text-4xl text-amber-100">
                  What is blackhole.
                </h1>
              </div>
              <p className="font-sm tracking-wide pt-2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Excepturi sit id, voluptatum aut obcaecati natus perspiciatis
                molestiae inventore dolore, minus ab accusamus alias ullam
                placeat quam architecto cum? Dolor possimus placeat quam cum
                culpa sapiente. Esse non quia repudiandae dolorem?
              </p>
              <br />
              <p className="font-sm tracking-wide">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Excepturi sit id, voluptatum aut obcaecati natus perspiciatis
                molestiae inventore dolore, minus ab accusamus alias ullam
                placeat quam architecto cum? Dolor possimus placeat quam cum
                culpa sapiente. Esse non quia repudiandae dolorem?
              </p>
              <br />
              <p className="font-sm tracking-wide">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Excepturi sit id, voluptatum aut obcaecati natus perspiciatis
                molestiae inventore dolore, minus ab accusamus alias ullam
                placeat quam architecto cum? Dolor possimus placeat quam cum
                culpa sapiente. Esse non quia repudiandae dolorem?
              </p>
            </div>
            <div className="h-full w-1/2">
              <div className="border-b border-zinc-500">
                <h1 className="font-bold tracking-wider text-4xl text-amber-100">
                  Why blackhole is used for.
                </h1>
              </div>
              <p className="font-sm tracking-wide pt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi sapiente fuga dolorum inventore iste cupiditate, fugit
                beatae veniam ex, ut, quidem voluptatibus hic aliquam nisi omnis
                est. Assumenda consequatur veritatis inventore quod delectus
                unde, minus non voluptatibus odio veniam! Deserunt?
              </p>
              <br />
              <p className="font-sm tracking-wide">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi sapiente fuga dolorum inventore iste cupiditate, fugit
                beatae veniam ex, ut, quidem voluptatibus hic aliquam nisi omnis
                est. Assumenda consequatur veritatis inventore quod delectus
                unde, minus non voluptatibus odio veniam! Deserunt?
              </p>
              <br />
              <p className="font-sm tracking-wide">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Excepturi sit id, voluptatum aut obcaecati natus perspiciatis
                molestiae inventore dolore, minus ab accusamus alias ullam
                placeat quam architecto cum? Dolor possimus placeat quam cum
                culpa sapiente. Esse non quia repudiandae dolorem?
              </p>
            </div>
          </div>
        </div>
        <div
          className="relative w-full overflow-hidden p-4 flex flex-col gap-6"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* TOP STRIP → LEFT */}
          <motion.div
            className="flex w-max gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: isHovering ? 40 : 18,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...services, ...services].map((item, index) => (
              <div
                key={`top-${index}`}
                className="px-6 py-3 border border-green-400/40 
                       rounded-full text-green-400 font-mono text-sm 
                       tracking-widest uppercase
                       hover:bg-green-400 hover:text-white
                       transition-all duration-300
                       shadow-[0_0_20px_rgba(0,255,150,0.35)]"
              >
                {item.title}
              </div>
            ))}
          </motion.div>

          {/* BOTTOM STRIP → RIGHT */}
          <motion.div
            className="flex w-max gap-6"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: isHovering ? 45 : 22,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...services, ...services].map((item, index) => (
              <div
                key={`bottom-${index}`}
                className="px-6 py-3 border border-green-400/30 
                       rounded-full text-green-400/80 font-mono text-sm 
                       tracking-widest uppercase
                       hover:bg-green-400 hover:text-black
                       transition-all duration-300
                       shadow-[0_0_15px_rgba(0,255,150,0.25)]"
              >
                {item.title}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="min-h-96 w-full p-6">
        <div className="bg-zinc-700 h-96 w-full"></div>
      </div>
    </>
  );
}

export default About;
