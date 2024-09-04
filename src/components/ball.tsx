import { BallPoisition } from "./types/board"

interface Props {
	ballPosition: BallPoisition
	handleDragStart: (event: React.DragEvent<HTMLDivElement>) => void
	handleDragEnd: (event: React.DragEvent<HTMLDivElement>) => void
}

const Ball = ({ ballPosition, handleDragStart, handleDragEnd }: Props) => {
	return (
		<div
			id='ball'
			draggable='true'
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			className='absolute w-[30px] h-[30px] bg-black rounded-full border-2 border-white cursor-pointer'
			style={{
				top: ballPosition.top,
				left: ballPosition.left,
			}}
		/>
	)
}

export default Ball
