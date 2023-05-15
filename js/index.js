const newTask = document.querySelector('#addTask');

// send data
newTask.addEventListener('keypress', (event) => {
	if (event.key === 'Enter') {
		event.preventDefault();

		if (newTask.value === '') return;
		else {
			db.collection('Todo-items').add({
				text: newTask.value,
				status: 'active',
			});
		}

		newTask.value = '';
	}
});

// fetch data
function getItem() {
	db.collection('Todo-items').onSnapshot((snapshot) => {
		let items = [];
		snapshot.docs.forEach((doc) => {
			items.push({
				id: doc.id,
				...doc.data(),
			});
		});

		document.querySelector('#total-items').innerHTML = `${items.length} items left`;
		generateItems(items);
		sortTask(items);
		deleteTask(items);
	});
}

getItem();

function sortTask(items) {
	let active = [];
	let completed = [];
	let sortBtn = document.querySelectorAll('.sortLinks');

	items.forEach((item) => {
		if (item.status === 'completed') completed.push(item);
		else active.push(item);
	});

	sortBtn.forEach((link) => {
		link.addEventListener('click', (e) => {
			if (link.textContent.trim() === 'All') {
				generateItems(items);
			} else if (link.textContent.trim() === 'Active') {
				generateItems(active);
			} else if (link.textContent.trim() === 'Completed') {
				generateItems(completed);
			}
		});
	});
}

function generateItems(items) {
	let tasks = '';
	items.forEach((item) => {
		let status = item.status === 'completed' ? 'checked' : '';
		tasks += `<li id="${item.id}" class="flex bg-white dark:bg-slate-700 items-center justify-between px-5 h-14">
		<div class="flex">
			<div
				class="flex items-center justify-center  w-6 h-6  rounded-full mr-3 bg-gradient-to-br from-sky-400 to-purple-500"
			>
				<input
					id="checkbox"
					class="w-full h-full rounded-full dark:bg-slate-700
					checked:dark:bg-transparent  text-transparent focus:ring-offset-0 focus:ring-0"
					type="checkbox"
					${status}
				/>
			</div>
			<p id='task' class="capitalize">${item.text}</p>
		</div>

		<div id="cross">
			<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="cursor-pointer fill-gray-500">
				<path
					fill-rule="evenodd"
					d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
				/>
			</svg>
		</div>
	</li>`;
	});

	document.querySelector('#taskList').innerHTML = tasks;
	let checkbox = document.querySelectorAll('#checkbox');
	checkbox.forEach((item) => {
		let task = item.parentElement.nextElementSibling;
		if (item.checked === true) {
			task.classList.add('line-through', 'text-gray-400', 'decoration-gray-500', 'dark:decoration-gray-300');
		}
	});
	todoStatusScan();
}

function todoStatusScan() {
	let todoStatus = document.querySelectorAll('#checkbox');
	todoStatus.forEach((item) => {
		item.addEventListener('click', (e) => {
			let id = item.parentElement.parentElement.parentElement.id;

			let task = db.collection('Todo-items').doc(id);

			task.get().then((doc) => {
				if (doc.data().status === 'active') {
					task.update({
						status: 'completed',
					});
				} else {
					task.update({
						status: 'active',
					});
				}
			});
		});
	});
}

function deleteTask(items) {
	const deleteBtn = document.querySelectorAll('#cross');
	const clearCompletedBtn = document.querySelector('#clearCompleted');
	deleteBtn.forEach((item) => {
		item.addEventListener('click', (e) => {
			let id = item.parentElement.id;
			db.collection('Todo-items').doc(id).delete();
		});
	});

	clearCompletedBtn.addEventListener('click', (e) => {
		items.forEach((item) => {
			if (item.status === 'completed') {
				db.collection('Todo-items').doc(item.id).delete();
			}
		});
	});
}
