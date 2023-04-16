import {Line, Group, Rect} from 'react-konva';

const BLOCKSIZE = 50;

export default function ActionConnector({x, y, uuid, erase}) {
	let dragEnd = (e) => {
		let props = e.target
		props.position({
			x: Math.round(props.x() / BLOCKSIZE) * BLOCKSIZE,
			y: Math.round(props.y() / BLOCKSIZE) * BLOCKSIZE
		})
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
			   width={BLOCKSIZE}
			   height={BLOCKSIZE * 2}>
			<Line
				points={[x, y + BLOCKSIZE, x + BLOCKSIZE, y + BLOCKSIZE]}
				stroke="black"
				strokeWidth={4} />
			<Rect
				  x={x}
				  y={y}
				  width={BLOCKSIZE}
				  height={BLOCKSIZE * 2}
				  id={uuid}
				  onDblClick={(e) => textChange(e)}
				  onClick={e => erase(e)} />
		</Group>
	)
}