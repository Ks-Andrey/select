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

		searchOption(select.querySelectorAll('li') ,input, ul);
	}

	function searchOption(li, input, ul) {
		input.addEventListener('input', () => {
			li.forEach(item => {
				item.classList.add('hide');

				if (item.textContent.indexOf(input.value.trim()) == 0) {
					item.classList.remove('hide');
				}
			})

			const obj = document.querySelector('.no-option');

			if (Array.from(li).every(item => item.classList.contains('hide'))) {
				if (!obj) {
					const noOption = document.createElement('div');

					noOption.classList.add('no-option');
					noOption.textContent = 'Нет результатов';
					ul.appendChild(noOption);
				}
			}else if(obj){
				obj.remove();
			}
		})
	}

	selectContainer.forEach(select => {
		newSelect(select);
	})
}