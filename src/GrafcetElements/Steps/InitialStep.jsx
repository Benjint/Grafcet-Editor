import {Text, Rect, Group} from 'react-konva';
import {useRef, useState} from "react";

const BLOCKSIZE = 50;

export default function InitialStep({x, y, uuid, erase, value}) {
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
			value = newValue
		}
	}


	return (
		<Group draggable onDragEnd={(e) => dragEnd(e)}
			   width={BLOCKSIZE * 2}
			   height={BLOCKSIZE * 2}>
			<Rect
				x={x}
				y={y}
				width={BLOCKSIZE * 2}
				height={BLOCKSIZE*2}
				stroke="black"
				strokeWidth={4} />
			<Rect
				x={x + 10}
				y={y + 10}
				width={BLOCKSIZE * 2 - 20}
				height={BLOCKSIZE * 2 - 20}
				stroke="black"
				strokeWidth={4} />
			<Text
				ref={textRef}
				x={x}
				y={y}
				width={BLOCKSIZE * 2}
				height={BLOCKSIZE * 2}
				align="center"
				verticalAlign="middle"
				text={data}
				fontFamily="Inter"
				fontSize={28} />
			<Rect
				x={x}
				y={y}
				width={BLOCKSIZE * 2}
				height={BLOCKSIZE * 2}
				id={uuid}
				onDblClick={(e) => textChange(e)}
				onClick={e => erase(e)} />
		</Group>
	)
}