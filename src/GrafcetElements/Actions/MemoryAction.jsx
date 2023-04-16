import {Text, Rect, Arrow, Group} from 'react-konva';
import {useRef, useState} from "react";

const BLOCKSIZE = 50;

export default function MemoryAction({x, y, uuid, erase, value}) {
	let [data, setData] = useState(value)
	const groupRef = useRef(null)
	const rectRef = useRef(null)
	const textRef = useRef(null)
	const clickRef = useRef(null)

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
			let len = newValue.length
			let size = Math.round((len * 28 + 72) / BLOCKSIZE) * BLOCKSIZE

			groupRef.current.width(size)
			rectRef.current.width(size)
			textRef.current.width(size)
			clickRef.current.width(size)

			setData(newValue)
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
			<Arrow
				points={[x, y, x, y - 15]}
				stroke="black"
				strokeWidth={4}
				pointerLength={5}
				pointerWidth={5}></Arrow>
			<Text ref={textRef}
				  x={x}
				  y={y}
				  width={BLOCKSIZE * 2}
				  height={BLOCKSIZE * 2}
				  text={data}
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