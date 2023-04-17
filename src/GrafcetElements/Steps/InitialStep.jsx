import {Text, Rect, Group} from 'react-konva';
import {useRef, useState} from "react";

const BLOCKSIZE = 50;

export default function InitialStep({x, y, uuid, erase, value, values, setValues}) {
	const [data, setData] = useState(value)
	const textRef = useRef(null)
	const clickRef = useRef(null)

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
		<Group ref={clickRef} draggable onDragEnd={(e) => dragEnd(e)}
			   x={x}
			   y={y}>
			<Rect
				width={BLOCKSIZE * 2}
				height={BLOCKSIZE*2}
				stroke="black"
				strokeWidth={4} />
			<Rect
				x={10}
				y={10}
				width={BLOCKSIZE * 2 - 20}
				height={BLOCKSIZE * 2 - 20}
				stroke="black"
				strokeWidth={4} />
			<Text
				ref={textRef}
				width={BLOCKSIZE * 2}
				height={BLOCKSIZE * 2}
				align="center"
				verticalAlign="middle"
				text={data}
				fontFamily="Inter"
				fontSize={28} />
			<Rect
				width={BLOCKSIZE * 2}
				height={BLOCKSIZE * 2}
				id={uuid}
				onDblClick={(e) => textChange(e)}
				onClick={e => erase(e)} />
		</Group>
	)
}