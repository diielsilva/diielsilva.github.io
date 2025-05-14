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
        <div>
        <img src="${item.image}"/>
        <span>${item.name}</span>
        </div>
        `
    })

    render(container, skillItems)
}

function displaySelectedProject(appState) {
    const container = document.querySelector("#project-container")
    const project = appState.projects[appState.selectedProject]
    let projectTechnologies = ""

    project.technologies.forEach(tech => {
        projectTechnologies += `<li>${tech}</li>`
    })

    const projectCard = `
        <article class="project">
            <img class="project-picture" src="${project.image}">
            <p>${project.description}</p>
            <ul>
                ${projectTechnologies}
            </ul>
            <div class="project-footer">
                <a href="${project.url}">
                    <button class="access-project-button">Access</button>
                </a>
            </div>
        </article>
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
    displaySelectedProject(appState)
}