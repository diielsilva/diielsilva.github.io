function render(element, content) {
    element.innerHTML = content
}

async function getData() {
    return await fetch("assets/files/data.json")
        .then(response => response.json())
}

function displaySkills(appState) {
    const container = document.querySelector("#skill-container")
    const skills = appState.skills
    let skillItems = ""

    skills.forEach(item => {
        skillItems += `
        <li>
        <div>
        <img src="${item.image}" title="${item.name}"/>
        </div>
        </li>
        `
    })

    render(container, skillItems)
}

function displayExperiences(appState) {
    const container = document.querySelector("#experience-container")
    let experiences = ""

    appState.experiences.forEach(experience => {
        experiences += `
            <li>
            <div>
                <h3>${experience.job}</h3>
                <h4>At ${experience.company}, ${experience.start} - ${experience.end}</h4>
                <p>${experience.description}</p>
            </div>
            </li>
        `
    })

    render(container, experiences)

}

function displaySelectedProject(appState) {
    const container = document.querySelector("#project-container")
    const project = appState.projects[appState.selectedProject]
    let projectTechnologies = ""

    project.technologies.forEach(tech => {
        projectTechnologies += `<li>${tech}</li>`
    })

    const projectCard = `
        <a href="${project.url}" target="_blank">
        <article>
            <img src="${project.image}">
            <p>${project.description}</p>
            <ul>
                ${projectTechnologies}
            </ul>
        </article>
        </a>
    `

    render(container, projectCard)

}

function nextProject(appState) {
    let project = appState.selectedProject

    project === appState.projects.length - 1 ? project = 0 : project += 1

    appState.selectedProject = project

    displaySelectedProject(appState)
}

function previousProject(appState) {
    let project = appState.selectedProject

    project === 0 ? project = appState.projects.length - 1 : project -= 1

    appState.selectedProject = project

    displaySelectedProject(appState)
}

window.onload = async () => {
    const data = await getData()
    const appState = {
        skills: data.skills,
        experiences: data.experiences,
        projects: data.projects,
        selectedProject: 0
    }

    const nextProjectBtn = document.querySelector("#next-project")
    const previousProjectBtn = document.querySelector("#previous-project")

    nextProjectBtn.onclick = () => {
        nextProject(appState)
    }

    previousProjectBtn.onclick = () => {
        previousProject(appState)
    }

    displaySkills(appState)
    displayExperiences(appState)
    displaySelectedProject(appState)
}