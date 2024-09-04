import { PlayerPosition } from "./types/board"

interface Props {
	playerPosition: PlayerPosition
	handleDragStart: (event: React.DragEvent<HTMLDivElement>) => void
	handleDragEnd: (event: React.DragEvent<HTMLDivElement>) => void
}

const getColor = (id: number) => {
	if (id === 1 || id === 12) {
		return "bg-yellow-400"
	}

	if (id > 1 && id < 12) {
		return "bg-red-600"
	}

	if (id > 12) {
		return "bg-blue-600"
	}

	return "bg-green-600"
}

const Player = ({ playerPosition, handleDragStart, handleDragEnd }: Props) => {
	const colorClass = getColor(playerPosition.id)

	return (
		<div
			id={`player-${playerPosition.id}`}
			draggable='true'
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			className={`absolute w-[30px] h-[30px] ${colorClass} rounded-full border-2 border-white cursor-pointer`}
			style={{
				top: playerPosition.top,
				left: playerPosition.left,
			}}
		/>
	)
}

export default Player
