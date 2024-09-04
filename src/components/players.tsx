import Player from "./player"
import { PlayerPosition } from "./types/board"

interface Props {
	playerPositions: PlayerPosition[]
	handleDragStart: (event: React.DragEvent<HTMLDivElement>) => void
	handleDragEnd: (event: React.DragEvent<HTMLDivElement>) => void
}

const Players = ({
	playerPositions,
	handleDragStart,
	handleDragEnd,
}: Props) => {
	return (
		<>
			{playerPositions.map((playerPosition) => (
				<Player
					key={playerPosition.id}
					playerPosition={playerPosition}
					handleDragStart={handleDragStart}
					handleDragEnd={handleDragEnd}
				/>
			))}
		</>
	)
}

export default Players
