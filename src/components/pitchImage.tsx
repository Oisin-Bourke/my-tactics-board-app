import Image from "next/image"
import pitch from "../../public/pitch.svg"

const PitchImage = () => {
	return <Image src={pitch} alt='Pitch' fill priority />
}

export default PitchImage
