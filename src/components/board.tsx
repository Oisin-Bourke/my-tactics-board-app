"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

interface BallPoisition {
	top: number
	left: number
}

interface PlayerPosition {
	id: number
	top: number
	left: number
}

const defaultBallPosition: BallPoisition = {
	top: 0,
	left: 0,
}

const defaultPlayerPositions: PlayerPosition[] = [
	{ id: 1, top: 250, left: 25 },
	{ id: 2, top: 100, left: 100 },
	{ id: 3, top: 200, left: 100 },
	{ id: 4, top: 300, left: 100 },
	{ id: 5, top: 400, left: 100 },
	{ id: 6, top: 100, left: 200 },
	{ id: 7, top: 200, left: 200 },
	{ id: 8, top: 300, left: 200 },
	{ id: 9, top: 400, left: 200 },
	{ id: 10, top: 200, left: 300 },
	{ id: 11, top: 300, left: 300 },
]

const Board = () => {
	const [ballPosition, setBallPosition] =
		useState<BallPoisition>(defaultBallPosition)
	const [playerPositions, setPlayerPositions] = useState<PlayerPosition[]>(
		defaultPlayerPositions
	)

	const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
		const element = event.currentTarget
		event.dataTransfer.setData(
			"text/plain",
			JSON.stringify({
				id: element.id,
				offsetX: event.clientX - element.getBoundingClientRect().left,
				offsetY: event.clientY - element.getBoundingClientRect().top,
			})
		)
	}

	const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
		//event.currentTarget.classList.remove("dragging")
	}

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		//event.currentTarget.classList.add("drag-over")
	}

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()

		const pitch = event.currentTarget.getBoundingClientRect()
		const data = event.dataTransfer.getData("text/plain")
		const { offsetX, offsetY, id } = JSON.parse(data)

		const newLeft = event.clientX - pitch.left - offsetX
		const newTop = event.clientY - pitch.top - offsetY

		if (id === "ball") {
			setBallPosition({
				left: Math.max(0, Math.min(newLeft, pitch.width - 30)),
				top: Math.max(0, Math.min(newTop, pitch.height - 30)),
			})

			return
		}

		setPlayerPositions((prev) =>
			prev.map((player) => {
				if (`player-${player.id}` === id) {
					return {
						...player,
						left: Math.max(0, Math.min(newLeft, pitch.width - 30)),
						top: Math.max(0, Math.min(newTop, pitch.height - 30)),
					}
				}

				return player
			})
		)
	}

	const handleReset = () => {
		setBallPosition(defaultBallPosition)
		setPlayerPositions(defaultPlayerPositions)
	}

	return (
		<div className='h-full flex-col'>
			<div className='container flex items-center justify-between py-4'>
				<h2 className='text-lg font-semibold whitespace-nowrap'>
					Tactics Board
				</h2>
				<div className='ml-auto flex w-full space-x-2 sm:justify-end'>
					<Button onClick={handleReset}>Reset</Button>
					<Button>Save</Button>
				</div>
			</div>
			<div className='mt-4 mb-4'>
				<Separator />
			</div>
			<div
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				className='relative w-[800px] pb-[65%] bg-green-500'
			>
				<div
					id='ball'
					draggable='true'
					onDragStart={handleDragStart}
					onDragEnd={handleDragEnd}
					className='absolute w-[30px] h-[30px] bg-white rounded-full border-2 border-white cursor-pointer'
					style={{
						top: ballPosition.top,
						left: ballPosition.left,
					}}
				/>
				{playerPositions.map((player) => (
					<div
						key={player.id}
						id={`player-${player.id}`}
						draggable='true'
						onDragStart={handleDragStart}
						onDragEnd={handleDragEnd}
						className='absolute w-[30px] h-[30px] bg-black rounded-full border-2 border-white cursor-pointer'
						style={{
							top: player.top,
							left: player.left,
						}}
					/>
				))}
			</div>
		</div>
	)
}

export default Board
