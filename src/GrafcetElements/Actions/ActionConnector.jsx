import {Line, Group, Rect} from 'react-konva';

const BLOCKSIZE = 50;

export default function ActionConnector({x, y, uuid, erase, values, setValues}) {
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

	let textChange = (e) => {
		let text = e.target
		let newValue = window.prompt("Enter new value", e.target.text())
		if (newValue !== null)
		{
			text.text(newValue)
		}
	}

	return (
		<Group draggable onDragEnd={(e) => dragEnd(e)}
			   x={x}
			   y={y}
			   width={BLOCKSIZE}
			   height={BLOCKSIZE * 2}>
			<Line
				points={[0, BLOCKSIZE, BLOCKSIZE, BLOCKSIZE]}
				stroke="black"
				strokeWidth={4} />
			<Rect
				  width={BLOCKSIZE}
				  height={BLOCKSIZE * 2}
				  id={uuid}
				  onDblClick={(e) => textChange(e)}
				  onClick={e => erase(e)} />
		</Group>
	)
}