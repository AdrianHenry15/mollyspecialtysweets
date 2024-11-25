"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import Logo from "@/public/mollys-logo-pink.png"

import Link from "next/link"
import { StaticImport } from "next/dist/shared/lib/get-img-props"

interface ISplashProps {
  img: string | StaticImport
  title: string
  link1: string
  link2: string
  btn1: string
  btn2: string
  btnClass1?: string
  btnClass2?: string
}

const Splash = (props: ISplashProps) => {
  return (
    <div className="fade-in w-full relative text-white bg-black md:h-[750px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full h-full">
        {/* Background Gradient */}
        <div className="absolute w-full h-full bg-gradient-to-r from-black flex"></div>
        {/* Background Image */}
        <Image
          className="w-full h-full object-cover object-center"
          src={props.img}
          alt={props.title}
        />

        {/* TEXT CONTAINER */}
        <div className="absolute inset-0 flex items-center justify-start p-4 md:p-8">
          <div className="max-w-md">
            {/* Logo */}
            <Image src={Logo} alt="logo" className="w-24 py-2" />

            {/* Title */}
            <h1 className="text-white whitespace-nowrap text-xl sm:text-5xl font-semibold">
              {props.title}
            </h1>

            {/* Links */}
            <div className="my-4">
              <Link
                href={props.link1}
                className={`${props.btnClass1 ? props.btnClass1 : ""} border bg-gray-300 text-sm rounded-sm text-black border-gray-300 py-2 px-5 sm:text-md`}>
                {props.btn1}
              </Link>
              <Link
                href={props.link2}
                className={`${props.btnClass2 ? props.btnClass2 : ""} border text-white text-sm rounded-sm border-gray-300 py-2 px-5 ml-4 sm:text-md`}>
                {props.btn2}
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Splash
