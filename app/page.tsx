import GetStartedButton from "@/components/GetStartedButton";



export default async function Home() {
  return (
    <main style={{ paddingLeft: 20, paddingTop: 50 }}>
      <h1 style={{ color: 'green' }}>
        Unleash Your Organizational Potential
      </h1>
      <h3 style={{ color: 'slategray' }}>
        Simplify, Streamline, and Conquer with Our Virtual List Website!
      </h3>

      <GetStartedButton />

    </main>
  )
}
