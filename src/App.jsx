import './App.css';
import {useEffect, useRef, useState} from "react";
import {Stage, Layer, Line} from 'react-konva';
import uuid from 'react-uuid';

import InitialStep from "./GrafcetElements/Steps/InitialStep";
import Step from "./GrafcetElements/Steps/Step";

import Transition from "./GrafcetElements/Transitions/Transition";
import JumpTo from "./GrafcetElements/Transitions/JumpTo";

import SimpleAction from "./GrafcetElements/Actions/SimpleAction";
import ActionConnector from "./GrafcetElements/Actions/ActionConnector";
import ConditionAction from "./GrafcetElements/Actions/ConditionAction";
import MemoryAction from "./GrafcetElements/Actions/MemoryAction";
import ConditionMemoryAction from "./GrafcetElements/Actions/ConditionMemoryAction";
import MacroAction from "./GrafcetElements/Actions/MacroAction";

import VerticalLine from "./GrafcetElements/Lines/VerticalLine";
import HorizontalLine from "./GrafcetElements/Lines/HorizontalLine";
import And from "./GrafcetElements/Lines/And";
import AndConnector from "./GrafcetElements/Lines/AndConnector";

import InitialStepLogo from './Icons/InitialStep.png'
import StepLogo from './Icons/Step.png'

import TransitionLogo from './Icons/Transition.png'
import JumpToLogo from './Icons/JumpTo.png'

import SimpleActionLogo from './Icons/SimpleAction.png'
import ActionConnectorLogo from './Icons/ActionConnector.png'
import ConditionActionLogo from './Icons/ConditionAction.png'
import MemoryActionLogo from './Icons/MemoryAction.png'
import ConditionMemoryActionLogo from './Icons/ConditionMemoryAction.png'
import MacroActionLogo from './Icons/MacroAction.png'

import VerticalLineLogo from './Icons/VerticalLine.png'
import HorizontalLineLogo from './Icons/HorizontalLine.png'
import AndLogo from './Icons/And.png'
import AndConnectorLogo from './Icons/AndConnector.png'

const BLOCKSIZE = 50;

function App() {

	const [draggedElement, setDraggedElement] = useState(null)
	const [stageSize, setStageSize] = useState({
		width: 0,
		height: 0
	})
	const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
	const [elements, setElements] = useState([])
	const [stageScale, setStageScale] = useState(1)

	const contentParent = useRef(null)
	const stage = useRef(null)
	const layerRef = useRef(null)
	const inputFile = useRef(null)

	useEffect(() => {
		setStageSize({width: contentParent.current.offsetWidth, height: contentParent.current.offsetHeight})
	}, [])

	useEffect(() => {
		console.log(elements)
		const unloadCallback = (event) => {
			event.preventDefault();
			event.returnValue = "";
			return "";
		};

		window.addEventListener("beforeunload", unloadCallback);
		return () => window.removeEventListener("beforeunload", unloadCallback);
	}, []);

	const generateElement = element =>
	{
		const erase = e => {
			if (e.evt.button === 2) {
				let id = e.target.attrs.id
				setElements(elements.filter(el => el.id !== id))
			}
		}

		switch (element.data)
		{
			case "initial":
				if (element.value === null) {
					element.value = 0
				}
				return <InitialStep x={element.x} y={element.y} uuid={element.id} erase={erase} value={element.value} values={elements} setValues={setElements} />
			case "step":
				if (element.value === null) {
					element.value = 1
				}
				return <Step x={element.x} y={element.y} uuid={element.id} erase={erase} value={element.value} values={elements} setValues={setElements} />

			case "transition":
				if (element.value === null) {
					element.value = 1
				}
				return <Transition x={element.x} y={element.y} uuid={element.id} erase={erase} value={element.value} values={elements} setValues={setElements} />
			case "jump-to":
				if (element.value === null) {
					element.value = "X0"
				}
				return <JumpTo x={element.x} y={element.y} uuid={element.id} erase={erase} value={element.value} values={elements} setValues={setElements} />

			case "simple-action":
				if (element.value === null) {
					element.value = "A"
				}
				return <SimpleAction x={element.x} y={element.y} uuid={element.id} erase={erase} value={element.value} values={elements} setValues={setElements} />
			case "action-connector":
				return <ActionConnector x={element.x} y={element.y} uuid={element.id} erase={erase} values={elements} setValues={setElements} />
			case "condition-action":
				if (element.value === null) {
					element.value = ["A", 1]
				}
				return <ConditionAction x={element.x} y={element.y} uuid={element.id} erase={erase} value={element.value} values={elements} setValues={setElements} />
			case "memory-action":
				if (element.value === null) {
					element.value = "A"
				}
				return <MemoryAction x={element.x} y={element.y} uuid={element.id} erase={erase} value={element.value} values={elements} setValues={setElements} />
			case "condition-memory-action":
				if (element.value === null) {
					element.value = ["A", 1]
				}
				return <ConditionMemoryAction x={element.x} y={element.y} uuid={element.id} erase={erase} value={element.value} values={elements} setValues={setElements} />
			case "macro-action":
				if (element.value === null) {
					element.value = "A"
				}
				return <MacroAction x={element.x} y={element.y} uuid={element.id} erase={erase} value={element.value} values={elements} setValues={setElements} />

			case "vertical-line":
				return <VerticalLine x={element.x} y={element.y} uuid={element.id} erase={erase} values={elements} setValues={setElements} />
			case "horizontal-line":
				return <HorizontalLine x={element.x} y={element.y} uuid={element.id} erase={erase} values={elements} setValues={setElements} />
			case "and":
				return <And x={element.x} y={element.y} uuid={element.id} erase={erase} values={elements} setValues={setElements} />
			case "and-connector":
				return <AndConnector x={element.x} y={element.y} uuid={element.id} erase={erase} values={elements} setValues={setElements} />
			default:
		}
	}

	const handleDrag = (event, data) => {
		event.preventDefault();
		setDraggedElement(data);
	}

	const handleDragOver = e => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = e => {
		stage.current.setPointersPositions(e)
		let id = uuid();
		setElements(
			elements.concat([
				{
					id: id,
					x: Math.round(stage.current.getRelativePointerPosition().x / BLOCKSIZE) * BLOCKSIZE,
					y: Math.round(stage.current.getRelativePointerPosition().y / BLOCKSIZE) * BLOCKSIZE,
					data: draggedElement,
					value: null
				}
			])
		)
		setDraggedElement(null)
		e.preventDefault();
		e.stopPropagation();
	};

	const newFile = () => {
		let confirm = window.confirm("Are you sure you want to create a new file ? It will delete all existing data")
		if (confirm)
		{
			setElements([])
		}
	}

	const open = () => {
		let confirm = window.confirm("Are you sure you want to open file ? It will delete all existing data")
		if (confirm)
		{
			inputFile.current.click();
		}
	}

	const handleFileSelected = (e) => {
		let file = e.target.files[0]
		let fileReader = new FileReader()
		fileReader.onloadend = () => {
			setElements(JSON.parse(fileReader.result))
		}
		fileReader.readAsText(file)
	}

	const save = () => {

		const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
			JSON.stringify(elements)
		)}`;

		let fileName = window.prompt("Enter filename : ")

		const link = document.createElement("a");
		link.href = jsonString;
		link.download = fileName + ".json";

		document.body.appendChild(link)
		link.click();
		document.body.removeChild(link);

	}

	const exportData = () => {
		const uri = layerRef.current.toDataURL();

		let fileName = window.prompt("Enter filename : ")

		const link = document.createElement("a");
		link.href = uri;
		link.download = fileName + ".png";

		document.body.appendChild(link)
		link.click();
		document.body.removeChild(link);
	}

	const handleWheel = (e) => {
		e.evt.preventDefault();

		const scaleBy = 1.05;
		const oldScale = stage.current.scaleX();

		const mousePointTo = {
			x: stage.current.getRelativePointerPosition().x / oldScale - stage.current.x() / oldScale,
			y: stage.current.getRelativePointerPosition().y / oldScale - stage.current.y() / oldScale
		}

		const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

		setStageScale(newScale)
		setStagePos({
			x: -(mousePointTo.x - stage.current.getRelativePointerPosition().x / newScale) * newScale,
			y: -(mousePointTo.y - stage.current.getRelativePointerPosition().y / newScale) * newScale
		})

	}
	
	let xPos = {
		start: Math.floor((-stagePos.x - stageSize.width) / BLOCKSIZE) * BLOCKSIZE,
		end: Math.floor((-stagePos.x + stageSize.width * 2) / BLOCKSIZE) * BLOCKSIZE
	}

	let yPos = {
		start: Math.floor((-stagePos.y - stageSize.height) / BLOCKSIZE) * BLOCKSIZE,
		end: Math.floor((-stagePos.y + stageSize.height * 2) / BLOCKSIZE) * BLOCKSIZE
	}

	let gridLines = []

	for (let i = xPos.start; i < xPos.end; i+= BLOCKSIZE)
	{
		gridLines.push(
			<Line
			points={
				[Math.round(i) + 0.5, yPos.start, Math.round(i) + 0.5, yPos.end]
			}
			stroke="#ddd"
			strokeWidth={1}></Line>
		)
	}

	for (let i = yPos.start; i < yPos.end; i+= BLOCKSIZE)
	{
		gridLines.push(
			<Line
				points={
					[xPos.start, Math.round(i) + 0.5, xPos.end, Math.round(i) + 0.5]
				}
				stroke="#ddd"
				strokeWidth={1}></Line>
		)
	}

	return (
		<div className="h-screen w-screen bg-gray-800 flex flex-col overflow-hidden">
			<input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={handleFileSelected} />
			<div className="toolbar flex">
				<div className="toolbarOption" onClick={newFile}>
					New
				</div>
				<div className="toolbarOption" onClick={open}>
					Open
				</div>
				<div className="toolbarOption" onClick={save}>
					Save
				</div>
				<div className="toolbarOption" onClick={exportData}>
					Export
				</div>
			</div>
			<div className="wrapper flex-1 flex">
				<div className="toolbox flex flex-col grid-cols-2">
					<div className="grid grid-cols-2">
						<div className="toolboxOption" draggable
							 onDrag={(event) => handleDrag(event, "initial")}>
							<img src={InitialStepLogo} alt="Initial Step" />
						</div>
						<div className="toolboxOption" draggable
							 onDrag={(event) => handleDrag(event, "step")}>
							<img src={StepLogo} alt="Step" />
						</div>
					</div>
					<div className="grid grid-cols-2">
						<div className="toolboxOption" draggable
							 onDrag={(event) => handleDrag(event, "transition")}>
							<img src={TransitionLogo} alt="Transition" />
						</div>
						<div className="toolboxOption" draggable
							 onDrag={(event) => handleDrag(event, "jump-to")}>
							<img src={JumpToLogo} alt="Jump To" />
						</div>
					</div>
					<div className="grid grid-cols-2">
						<div className="toolboxOption" draggable
							 onDrag={(event) => handleDrag(event, "simple-action")}>
							<img src={SimpleActionLogo} alt="Simple Action" />
						</div>
						<div className="toolboxOption" draggable
							 onDrag={(event) => handleDrag(event, "action-connector")}>
							<img src={ActionConnectorLogo} alt="Action Connector" />
						</div>
						<div className="toolboxOption" draggable
							 onDrag={(event) => handleDrag(event, "condition-action")}>
							<img src={ConditionActionLogo} alt="Condition Action" />
						</div>
						<div className="toolboxOption" draggable
							 onDrag={(event) => handleDrag(event, "memory-action")}>
							<img src={MemoryActionLogo} alt="Memory Action" />
						</div>
						<div className="toolboxOption" draggable
							 onDrag={(event) => handleDrag(event, "condition-memory-action")}>
							<img src={ConditionMemoryActionLogo} alt="Condition Memory Action" />
						</div>
						<div className="toolboxOption" draggable
							 onDrag={(event) => handleDrag(event, "macro-action")}>
							<img src={MacroActionLogo} alt="Macro Action" />
						</div>
					</div>
					<div className="grid grid-cols-2">
						<div className="toolboxOption" draggable
							 onDrag={(event) => handleDrag(event, "vertical-line")}>
							<img src={VerticalLineLogo} alt="Vertical Line" />
						</div>
						<div className="toolboxOption" draggable
							 onDrag={(event) => handleDrag(event, "horizontal-line")}>
							<img src={HorizontalLineLogo} alt="Horizontal Line" />
						</div>
						<div className="toolboxOption" draggable
							 onDrag={(event) => handleDrag(event, "and")}>
							<img src={AndLogo} alt="And" />
						</div>
						<div className="toolboxOption" draggable
							 onDrag={(event) => handleDrag(event, "and-connector")}>
							<img src={AndConnectorLogo} alt="And Connector" />
						</div>
					</div>
				</div>
				<div
					ref={contentParent}
					id="contentParent"
					className="flex-1"
					onDragOver={e => handleDragOver(e)}
					onDrop={e => handleDrop(e)}>
					<Stage
						ref={stage}
						x={stagePos.x}
						y={stagePos.y}
						draggable
						width={stageSize.width}
						height={stageSize.height}
						className="bg-white"
						onDragEnd={e => {
							setStagePos(e.currentTarget.position());
						}}
						onContextMenu={e => {
							e.evt.preventDefault()
						}}
						onWheel={handleWheel}
						scaleX={stageScale}
						scaleY={stageScale}>
						<Layer>
							{gridLines}
						</Layer>
						<Layer ref={layerRef}>
							{elements.map((element) => {
								return generateElement(element)
							})}
						</Layer>
					</Stage>
				</div>
			</div>
		</div>
	);
}

export default App;
