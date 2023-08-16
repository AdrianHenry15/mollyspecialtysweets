"use client"
import React from "react"
import HydrationZustand from "./helpers/HydrationZustand"
import Navbar from "./components/Navbar"
import Modal from "./components/Modal"
import MainOrderForm from "./components/MainOrderForm"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <HydrationZustand>
      <main className="flex flex-col items-center justify-center">
        <Navbar />
        <Modal />
        <MainOrderForm />
        <Footer />
      </main>
    </HydrationZustand>
  )
}
