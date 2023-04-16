import {Text, Line, Group, Rect} from 'react-konva';
import {useRef, useState} from "react";

const BLOCKSIZE = 50;

export default function Transition({x, y, uuid, erase, value}) {
	let [data, setData] = useState(value)
	let textRef = useRef(null)

	let dragEnd = (e) => {
		let props = e.target
		props.position({
			x: Math.round(props.x() / BLOCKSIZE) * BLOCKSIZE,
			y: Math.round(props.y() / BLOCKSIZE) * BLOCKSIZE
		})
	}

	let textChange = () => {
		let newValue = window.prompt("Enter new value", data)
		if (newValue !== null)
		{
			setData(newValue)
			value = data
		}
	}

	return (
		<Group draggable onDragEnd={(e) => dragEnd(e)}
			   width={BLOCKSIZE * 2}
			   height={BLOCKSIZE * 3}>
			<Line
				stroke="black"
				strokeWidth={4}
				points={[x + BLOCKSIZE, y, x + BLOCKSIZE, y + BLOCKSIZE * 3]} />

			<Line
				stroke="black"
				strokeWidth={4}
				points={[x + 20, y + BLOCKSIZE * 1.5, x + 30 + BLOCKSIZE, y + BLOCKSIZE * 1.5]} />

			<Text ref={textRef}
				x={x + 40 + BLOCKSIZE}
				y={y + BLOCKSIZE * 1.5 - 10}
				text={data}
				fontFamily="Inter"
				fontSize={20} />
			<Rect
				x={x}
				y={y}
				width={BLOCKSIZE * 2}
				height={BLOCKSIZE * 3}
				id={uuid}
				onDblClick={(e) => textChange(e)}
				onClick={e => erase(e)} />
		</Group>
	)
}