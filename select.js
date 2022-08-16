function select(selectContainerSelector) {
	const selectContainer = document.querySelectorAll(selectContainerSelector);

	function newSelect(select) {
		const selectTag = select.querySelector('select'),
			  options = selectTag.querySelectorAll('option'),
			  ul = document.createElement('ul'),
			  input = document.createElement('input');

		input.classList.add('select-input');

		select.appendChild(input);

		options.forEach((item, i) => {
			const li = document.createElement('li');
			li.textContent = item.textContent;
			ul.appendChild(li);
			select.appendChild(ul);

			li.addEventListener('click', () => {
				input.value = li.textContent;
			})
		});

		input.value = options[0].textContent;

		selectTag.remove();

		select.addEventListener('click', () => {
			ul.classList.toggle('active');
		})
	}

	selectContainer.forEach(select => {
		newSelect(select);
	})
}