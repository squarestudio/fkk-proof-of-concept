import { useState, Suspense } from "react"
import "./App.css"
import { Radio } from "@material-tailwind/react"
import { Canvas } from "@react-three/fiber"
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { Model1 } from "./model1"
import { Model2 } from "./model2"
import useShopifyConnect from "./hooks/useShopifyConnect"

function App() {
  const { param, bladeColor } = useShopifyConnect()

  const [selectModel, setSelectModel] = useState("model1")
  const [bladesColor, setBladesColor] = useState("#cacccd")
  const [discColor1, setDiscColor1] = useState("#d81818")
  const [discColor2, setDiscColor2] = useState("#e2dd65")
  return (
    <div className="w-screen h-screen bg-gray-900">
      <div className="absolute w-80 p-5 flex flex-col bg-white z-10">
        <div className="flex justify-center gap-10 mb-5">
          <Radio
            name="type"
            label="Model 1"
            defaultChecked
            onClick={() => {
              if (selectModel === "model2") setSelectModel("model1")
            }}
          />
          <Radio
            name="type"
            label="Model 2"
            onClick={() => {
              if (selectModel === "model1") setSelectModel("model2")
            }}
          />
        </div>
        <div className="flex gap-3 ml-5 mb-5">
          <label>Blades:</label>
          <input
            type="color"
            name="blades"
            value={bladesColor}
            onChange={(event) => {
              setBladesColor(event.target.value)
            }}
          />
        </div>
        <div className="flex gap-3 ml-5 mb-5">
          <label>Discs:</label>
          <input
            type="color"
            name="Disc1"
            value={discColor1}
            onChange={(event) => {
              setDiscColor1(event.target.value)
            }}
          />
          <input
            type="color"
            name="Disc2"
            value={discColor2}
            onChange={(event) => {
              setDiscColor2(event.target.value)
            }}
          />
        </div>
      </div>
      <Canvas
        shadows={true}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          preserveDrawingBuffer: true,
        }}
        camera={{
          fov: 40,
          position: [0, 0.5, 12],
        }}
      >
        <Environment files="https://cdn.shopify.com/s/files/1/0739/0206/3938/files/forest_slope_1k.hdr" />
        <Suspense fallback={null}>
          <Model1
            scale={[0.01, 0.01, 0.01]}
            visible={selectModel === "model1"}
            bladesColor={bladeColor}
            discColor1={discColor1}
            discColor2={discColor2}
          />
          <Model2
            scale={[0.014, 0.014, 0.014]}
            position-y={-0.5}
            visible={selectModel === "model2"}
            bladesColor={bladeColor}
            discColor1={discColor1}
            discColor2={discColor2}
          />
        </Suspense>
        <ContactShadows position={[0, -0.8, 0]} color="#ffffff" />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default App
