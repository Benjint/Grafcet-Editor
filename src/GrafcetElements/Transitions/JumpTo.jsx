import {Line, Text, Group, Rect} from 'react-konva';
import {useRef, useState} from "react";

const BLOCKSIZE = 50;

export default function JumpTo({x, y, uuid, erase, value}) {
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
			   height={BLOCKSIZE * 2}>
			<Line
				stroke="black"
				strokeWidth={4}
				points={[x + BLOCKSIZE, y, x + BLOCKSIZE, y + BLOCKSIZE * 2]}
				lineCap={"square"} />
			<Line
				stroke="black"
				strokeWidth={4}
				points={[x + 10, y + BLOCKSIZE + 10, x + BLOCKSIZE, y + BLOCKSIZE * 2]}
				lineCap={"square"} />
			<Line
				stroke="black"
				strokeWidth={4}
				points={[x + BLOCKSIZE * 2 - 10, y + BLOCKSIZE + 10, x + BLOCKSIZE, y + BLOCKSIZE * 2]}
				lineCap={"square"} />
			<Text ref={textRef}
				x={x}
				y={y + BLOCKSIZE * 2 + 10}
				width={BLOCKSIZE * 2}
				align={"center"}
				text={data}
				fontFamily="Inter"
				fontSize={28} ></Text>
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