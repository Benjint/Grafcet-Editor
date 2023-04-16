import {Line, Group, Rect} from 'react-konva';

const BLOCKSIZE = 50;

export default function HorizontalLine({x, y, uuid, erase}) {
	let dragEnd = (e) => {
		let props = e.target
		props.position({
			x: Math.round(props.x() / BLOCKSIZE) * BLOCKSIZE,
			y: Math.round(props.y() / BLOCKSIZE) * BLOCKSIZE
		})
	}

	return (
		<Group draggable onDragEnd={(e) => dragEnd(e)}
			   width={BLOCKSIZE * 2}
			   height={BLOCKSIZE * 3}>
			<Line
				stroke="black"
				strokeWidth={4}
				points={[x + BLOCKSIZE, y, x + BLOCKSIZE, y + BLOCKSIZE * 3]}
				lineCap={"square"} />
			<Rect
				x={x}
				y={y}
				width={BLOCKSIZE * 2}
				height={BLOCKSIZE * 3}
				id={uuid}
				onClick={e => erase(e)} />
		</Group>
	)
}