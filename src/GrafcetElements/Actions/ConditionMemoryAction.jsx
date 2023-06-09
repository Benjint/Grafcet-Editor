import {Text, Rect, Arrow, Group} from 'react-konva';
import {useRef, useState} from "react";

const BLOCKSIZE = 50;

export default function ConditionMemoryAction({x, y, uuid, erase, value, values, setValues}) {
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

		let index = values.findIndex(element => element.id === uuid)
		values[index].x = props.x()
		values[index].y = props.y()
		setValues(values)
	}

	let conditionChange = () => {
		let newValue = window.prompt("Enter new value", data[1])
		if (newValue !== null) {
			setData([data[0], newValue])

			let index = values.findIndex(element => element.id === uuid)
			values[index].value = [data[0], newValue]
			setValues(values)
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
			lineRef.current.x(size - 15)
			conditionRef.current.x(size - 20)
			clickRef.current.width(size)

			setData([newValue, data[1]])

			let index = values.findIndex(element => element.id === uuid)
			values[index].value = [newValue, data[1]]
			setValues(values)
		}
	}

	let parseCondition = () => {
		//!(abc) =
		let text = JSON.stringify(data[1])
		text = text.replace("//", "↑").replace("\\\\", "↓").replace(/"/g, "")
		let matches = text.match(/!\((.)+\)/g)
		if (matches !== null)
		{
			for (let i = 0; i < matches.length; i++) {
				let str = matches[i]
				let result = ""
				str = str.replace(/!\(/g, "").replace(/\)/g, "")

				for (let j = 0; j < str.length; j++) {
					result += str[j] + "̅"
				}
				console.log(matches[i], result)
				text = text.replace(matches[i], result)
			}
		}
		return text
	}

	return (
		<Group ref={groupRef} draggable onDragEnd={(e) => dragEnd(e)}
			   x={x}
			   y={y}
			   width={BLOCKSIZE * 2}
			   height={BLOCKSIZE * 2}>
			<Rect ref={rectRef}
				  width={BLOCKSIZE * 2}
				  height={BLOCKSIZE * 2}
				  stroke="black"
				  strokeWidth={4} />
			<Arrow
				points={[0, 0, 0, -15]}
				stroke="black"
				strokeWidth={4}
				pointerLength={5}
				pointerWidth={5}></Arrow>
			<Rect ref={lineRef}
				  x={BLOCKSIZE * 2 - 15}
				  y={-15}
				  height={15}
				  width={0}
				  stroke="black"
				  strokeWidth={4} />
			<Text ref={conditionRef}
				  x={BLOCKSIZE * 2 - 20}
				  y={-40}
				  text={parseCondition()}
				  fontFamily="Inter"
				  fontSize={20}
				  onDblClick={(e) => conditionChange(e)} />
			<Text ref={textRef}
				  width={BLOCKSIZE * 2}
				  height={BLOCKSIZE * 2}
				  text={data[0]}
				  align={"center"}
				  verticalAlign={"middle"}
				  fontFamily="Inter"
				  fontSize={28} />
			<Rect ref={clickRef}
				  width={BLOCKSIZE * 2}
				  height={BLOCKSIZE * 2}
				  id={uuid}
				  onDblClick={(e) => textChange(e)}
				  onClick={e => erase(e)} />
		</Group>
	)
}