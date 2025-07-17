import MatrixBg from "./components/matrix-bg";
import CLIBox from "./components/cli-box";

export default function Home() {
  return (
    <div className="relative w-full h-screen bg-[#000000]">
      <MatrixBg />
      <CLIBox 
        
        lines={["> hello world"
        ]}
      />
    </div>
  )
}