function select({selectContainerSelector, search, DataBase}) {
	const selectContainer = document.querySelectorAll(selectContainerSelector);

	function newSelect(select, i) {
		const selectTag = select.querySelector('select'),
			  options = selectTag.querySelectorAll('option'),
			  ul = document.createElement('ul'),
			  input = document.createElement('input');

		input.classList.add('select-input');
		select.appendChild(input);

		select.addEventListener('click', () => {
			ul.classList.toggle('active');
		})

		if (DataBase) {
			getOptions(DataBase, i, ul, select, input)
		}else{
			createOption(options, ul, select, input);
		}

		selectTag.remove();
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

	function createOption(options, ul, select, input) {
		options.forEach((item, i) => {
			const li = document.createElement('li');

			if (typeof(item) === 'string') {
				li.textContent = item;
				input.value = options[0];
			}else{
				li.textContent = item.textContent;
				input.value = options[0].textContent;
			}

			ul.appendChild(li);
			select.appendChild(ul);

			li.addEventListener('click', () => {
				input.value = li.textContent;
			})
		});

		if (search) {
			searchOption(select.querySelectorAll('li'), input, ul);
		}
	}

	function getOptions(url, i, ul, select, input) {
		fetch(url)
			.then(res => res.json())
			.then(res => {
				createOption(res[i], ul, select, input)
			});
	}

	selectContainer.forEach((select, i) => {
		newSelect(select, i);
	})
}