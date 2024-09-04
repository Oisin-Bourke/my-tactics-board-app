"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import PitchImage from "./pitchImage"
import Ball from "./ball"
import Players from "./players"

import { BallPoisition, PlayerPosition } from "./types/board"

const offset = 15

const defaultBallPosition: BallPoisition = {
	top: 250 - offset,
	left: 400 - offset,
}

const defaultPlayerPositions: PlayerPosition[] = [
	// team A
	// goalkeeper
	{ id: 1, top: 250 - offset, left: 50 - offset },
	// defenders
	{ id: 2, top: 100 - offset, left: 150 - offset },
	{ id: 3, top: 200 - offset, left: 150 - offset },
	{ id: 4, top: 300 - offset, left: 150 - offset },
	{ id: 5, top: 400 - offset, left: 150 - offset },
	// midfielders
	{ id: 6, top: 100 - offset, left: 250 - offset },
	{ id: 7, top: 200 - offset, left: 250 - offset },
	{ id: 8, top: 300 - offset, left: 250 - offset },
	{ id: 9, top: 400 - offset, left: 250 - offset },
	// forwards
	{ id: 10, top: 200 - offset, left: 350 - offset },
	{ id: 11, top: 300 - offset, left: 350 - offset },
	// team B
	// goalkeeper
	{ id: 12, top: 250 - offset, left: 750 - offset },
	// defenders
	{ id: 13, top: 100 - offset, left: 650 - offset },
	{ id: 14, top: 200 - offset, left: 650 - offset },
	{ id: 15, top: 300 - offset, left: 650 - offset },
	{ id: 16, top: 400 - offset, left: 650 - offset },
	// midfielders
	{ id: 17, top: 100 - offset, left: 550 - offset },
	{ id: 18, top: 200 - offset, left: 550 - offset },
	{ id: 19, top: 300 - offset, left: 550 - offset },
	{ id: 20, top: 400 - offset, left: 550 - offset },
	// forwards
	{ id: 21, top: 200 - offset, left: 450 - offset },
	{ id: 22, top: 300 - offset, left: 450 - offset },
]

const Board = () => {
	const [ballPosition, setBallPosition] =
		useState<BallPoisition>(defaultBallPosition)
	const [playerPositions, setPlayerPositions] = useState<PlayerPosition[]>(
		defaultPlayerPositions
	)

	const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
		event.stopPropagation()

		const { currentTarget: element, dataTransfer } = event
		dataTransfer.effectAllowed = "move"

		// clone the element to replace the default drag image (will not drag the background)
		const clonedElement = element.cloneNode() as HTMLElement
		clonedElement.id = "cloned-dragging-element"
		clonedElement.style.position = "absolute"
		clonedElement.style.top = "-100px"
		clonedElement.style.left = "-100px"
		document.body.appendChild(clonedElement)

		dataTransfer.setDragImage(clonedElement, 15, 15)

		dataTransfer.setData(
			"text/plain",
			JSON.stringify({
				id: element.id,
				offsetX: event.clientX - element.getBoundingClientRect().left,
				offsetY: event.clientY - element.getBoundingClientRect().top,
			})
		)
	}

	const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()

		const clonedElement = document.getElementById("cloned-dragging-element")
		if (!clonedElement) {
			return
		}

		document.body.removeChild(clonedElement)
	}

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault()
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
				className='relative w-[800px] pb-[62.5%]'
				onDragOver={handleDragOver}
				onDrop={handleDrop}
			>
				<PitchImage />
				<Ball
					ballPosition={ballPosition}
					handleDragStart={handleDragStart}
					handleDragEnd={handleDragEnd}
				/>
				<Players
					playerPositions={playerPositions}
					handleDragStart={handleDragStart}
					handleDragEnd={handleDragEnd}
				/>
			</div>
		</div>
	)
}

export default Board
