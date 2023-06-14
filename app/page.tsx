import GetStartedButton from "@/components/GetStartedButton";
import SigninForm from "@/components/SigninForm";



export default async function Home() {
  return (
    <main style={{ paddingLeft: 20, paddingTop: 70, paddingRight: 100, display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: 1, padding: 50 }}>
        <h1 style={{ color: 'green' }}>
          Unleash Your Data Potential
        </h1>
        <h3 style={{ color: 'slategray', textAlign: 'justify' }}>
          Losing patience with slow initial loading and laggy scrolling experience?
        </h3>
        <h3 style={{ color: 'slategray', textAlign: 'justify' }}>
          With Virtual List, we can provide a scalable and optimized solution for
          efficiently rendering large data sets, improving performance, memory usage,
          and user experience.
        </h3>
        <GetStartedButton />
      </div>

      <SigninForm />


    </main>
  )
}
