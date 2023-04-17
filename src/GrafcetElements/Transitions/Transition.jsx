import {Group, Line, Rect, Text} from 'react-konva';
import {useRef, useState} from "react";

const BLOCKSIZE = 50;

export default function Transition({x, y, uuid, erase, value, values, setValues}) {
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

	let parseCondition = () => {
		//!(abc) =
		let text = JSON.stringify(data)
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
		<Group draggable onDragEnd={(e) => dragEnd(e)}
			   x={x}
			   y={y}
			   width={BLOCKSIZE * 2}
			   height={BLOCKSIZE * 3}>
			<Line
				stroke="black"
				strokeWidth={4}
				points={[BLOCKSIZE, 0, BLOCKSIZE, BLOCKSIZE * 3]} />

			<Line
				stroke="black"
				strokeWidth={4}
				points={[20, BLOCKSIZE * 1.5, 30 + BLOCKSIZE, BLOCKSIZE * 1.5]} />

			<Text ref={textRef}
				x={40 + BLOCKSIZE}
				y={BLOCKSIZE * 1.5 - 10}
				text={parseCondition()}
				fontFamily="Inter"
				fontSize={20} />
			<Rect
				width={BLOCKSIZE * 2}
				height={BLOCKSIZE * 3}
				id={uuid}
				onDblClick={(e) => textChange(e)}
				onClick={e => erase(e)} />
		</Group>
	)
}