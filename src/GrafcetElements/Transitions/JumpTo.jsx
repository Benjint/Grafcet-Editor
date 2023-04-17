import {Line, Text, Group, Rect} from 'react-konva';
import {useRef, useState} from "react";

const BLOCKSIZE = 50;

export default function JumpTo({x, y, uuid, erase, value, values, setValues}) {
	let [data, setData] = useState(value)
	let textRef = useRef(null)
	let dragEnd = (e) => {
		let props = e.target
		props.position({
			x: Math.round(props.x() / BLOCKSIZE) * BLOCKSIZE,
			y: Math.round(props.y() / BLOCKSIZE) * BLOCKSIZE
		})

		let index = values.findIndex(element => element.id === uuid)
		values[index].x = props.x()
		values[index].y = props.y()
		setValues(values)
	}

	let textChange = () => {
		let newValue = window.prompt("Enter new value", data)
		if (newValue !== null)
		{
			setData(newValue)

			let index = values.findIndex(element => element.id === uuid)
			values[index].value = newValue
			setValues(values)
		}
	}

	return (
		<Group draggable onDragEnd={(e) => dragEnd(e)}
			   x={x}
			   y={y}
			   width={BLOCKSIZE * 2}
			   height={BLOCKSIZE * 2}>
			<Line
				stroke="black"
				strokeWidth={4}
				points={[BLOCKSIZE, 0, BLOCKSIZE, BLOCKSIZE * 2]}
				lineCap={"square"} />
			<Line
				stroke="black"
				strokeWidth={4}
				points={[10, BLOCKSIZE + 10, BLOCKSIZE, BLOCKSIZE * 2]}
				lineCap={"square"} />
			<Line
				stroke="black"
				strokeWidth={4}
				points={[BLOCKSIZE * 2 - 10, BLOCKSIZE + 10, BLOCKSIZE, BLOCKSIZE * 2]}
				lineCap={"square"} />
			<Text ref={textRef}
				y={BLOCKSIZE * 2 + 10}
				width={BLOCKSIZE * 2}
				align={"center"}
				text={data}
				fontFamily="Inter"
				fontSize={28} ></Text>
			<Rect
				width={BLOCKSIZE * 2}
				height={BLOCKSIZE * 3}
				id={uuid}
				onDblClick={(e) => textChange(e)}
				onClick={e => erase(e)} />
		</Group>
	)
}