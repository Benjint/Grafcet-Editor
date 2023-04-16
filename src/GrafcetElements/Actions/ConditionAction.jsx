import {Text, Rect, Group} from 'react-konva';
import {useRef, useState} from "react";

const BLOCKSIZE = 50;

export default function ConditionAction({x, y, uuid, erase, value}) {
	let [data, setData] = useState(value)
	const groupRef = useRef(null)
	const rectRef = useRef(null)
	const textRef = useRef(null)
	const lineRef = useRef(null)
	const conditionRef = useRef(null)
	const clickRef = useRef(null)

	let dragEnd = (e) => {
		let props = e.target
		props.position({
			x: Math.round(props.x() / BLOCKSIZE) * BLOCKSIZE,
			y: Math.round(props.y() / BLOCKSIZE) * BLOCKSIZE
		})
	}

	let conditionChange = () => {
		let newValue = window.prompt("Enter new value", data[1])
		if (newValue !== null) {
			setData([data[0], newValue])
			value = data
		}
	}

	let textChange = () => {
		let newValue = window.prompt("Enter new value", data[0])
		if (newValue !== null)
		{
			let len = newValue.length
			let size = Math.round((len * 28 + 72) / BLOCKSIZE) * BLOCKSIZE

			groupRef.current.width(size)
			rectRef.current.width(size)
			textRef.current.width(size)
			lineRef.current.x(x + size - 15)
			conditionRef.current.x(x + size - 20)
			clickRef.current.width(size)

			setData([newValue, data[1]])
			value = data
		}
	}
	return (
		<Group ref={groupRef} draggable onDragEnd={(e) => dragEnd(e)}
			   width={BLOCKSIZE * 2}
			   height={BLOCKSIZE * 2}>
			<Rect ref={rectRef}
				  x={x}
				  y={y}
				  width={BLOCKSIZE * 2}
				  height={BLOCKSIZE * 2}
				  stroke="black"
				  strokeWidth={4} />
			<Rect ref={lineRef}
				  x={x + BLOCKSIZE * 2 - 15}
				  y={y - 15}
				  height={15}
				  width={0}
				  stroke="black"
				  strokeWidth={4} />
			<Text ref={conditionRef}
				  x={x + BLOCKSIZE * 2 - 20}
				  y={y-40}
				  text={data[1]}
				  fontFamily="Inter"
				  fontSize={20}
				  onDblClick={(e) => conditionChange(e)} />
			<Text ref={textRef}
				  x={x}
				  y={y}
				  width={BLOCKSIZE * 2}
				  height={BLOCKSIZE * 2}
				  text={data[0]}
				  align={"center"}
				  verticalAlign={"middle"}
				  fontFamily="Inter"
				  fontSize={28} />
			<Rect ref={clickRef}
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