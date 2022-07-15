const dashBoard = document.querySelector('.dashboard');
let timeLine;
const timeFrameMap = {
	weekly: 'last Week',
	daily: 'Yesterday',
	monthly: 'Last Month',
};

async function getTimeLine() {
	// fetching data
	try {
		const jsonData = await fetch('./data.json');
		const data = await jsonData.json();
		timeLine = data;
		// create intial dashboard
		createDashBoard(data, 'weekly');
	} catch (error) {
		dashBoard.innerHTML = '<p> Cannot Get Dashboard Data </p>';
	}
}

function createDashBoard(timeLine = [], activePeriod = 'weekly') {
	dashBoard.innerHTML = `
	<header class="dashboard-header">
					<div class="dashboard-user">
						<div class="dashboard-user-picture">
							<img src="images/image-jeremy.png" alt="jeremy" />
						</div>
						<h1><span>Reported for</span> Jeremy Roborson</h1>
					</div>
					<nav class="dashboard-navigation">
						<ul>
							<li><button class="${
								activePeriod === 'daily' ? 'active' : ''
							}" data-period="daily">Daily</button></li>
							<li>
								<button class="${
									activePeriod === 'weekly' ? 'active' : ''
								}" data-period="weekly">Weekly</button>
							</li>
							<li><button class="${
								activePeriod === 'monthly' ? 'active' : ''
							}" data-period="monthly">Monthly</button></li>
						</ul>
					</nav>
				</header>
                ${timeLine
									.map(
										(frame) =>
											`<section class="dashboard-info">
										<div>
											<header>
												<h2>${frame.title}</h2>
												<button class="more">
													<img src="images/icon-ellipsis.svg" alt="more" />
												</button>
											</header>
											<div>
												<p class="current-info">${frame.timeframes[activePeriod].current}hrs</p>
												<p class="old-info">${timeFrameMap[activePeriod]} - ${frame.timeframes[activePeriod].previous}hrs</p>
											</div>
										</div>
									</section>`
									)
									.join('')}
    `;
	addEventListenerToButtons();
}

function addEventListenerToButtons() {
	const navigationButtons = dashBoard.querySelectorAll(
		'.dashboard-navigation button'
	);
	navigationButtons.forEach((button) =>
		button.addEventListener('click', changeDataTitle)
	);
}

function changeDataTitle(e) {
	if (e.target.classList.contains('active')) {
		console.log('trabed');
		return;
	}

	createDashBoard(timeLine, e.target.dataset.period);
}

getTimeLine();
