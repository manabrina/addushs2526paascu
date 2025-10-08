const menuItems = [
  // Start sa PART I
  { title: "PART I. School Profile", header: true },
  { 
    title: "AdDU Senior High School History", 
    id: "parts/part1/history"
  },
  {
    title: "Identity, Vision, Mission, Values, Philosophy, Goals, and Objectives",
    id: "parts/part1/identity"
  },
  {
    title: "Organizational Structure",
    id: "parts/part1/organization"
  },
  {
    title: "Governing Board and List of Top Executives",
    id: "parts/part1/governing"
  },
  {
    title: "Educational Programs",
    id: "parts/part1/educational"
  },
  {
    title: "Enrollment Data",
    id: "parts/part1/enrollment"
  },
  {
    title: "Description of the Regulatory Environment",
    id: "parts/part1/regulatory"
  },
  {
    title: "Identified Strategic Challenges",
    id: "parts/part1/identified"
  },
  // Start sa PART II
  // { title: "PART II. Follow-up Action on the previous Recommendation.", header: true },
  // { 
  //   title: "Administration Observation Summary", 
  //   id: "parts/part2/administration"
  // },
  // { 
  //   title: "Facilities Observation Summary", 
  //   id: "parts/part2/facilities"
  // },
  // { 
  //   title: "Faculty Observation Summary", 
  //   id: "parts/part2/faculty"
  // },
  // { 
  //   title: "IMC Observation Summary", 
  //   id: "parts/part2/observation"
  // },
  // { 
  //   title: "Instruction Observation Summary", 
  //   id: "parts/part2/instruction"
  // },
  // { 
  //   title: "Student Services Observation Summary", 
  //   id: "parts/part2/student"
  // },
  // Start sa PART III
  { title: "Part III. Analysis of School Practices", header: true },
  {
    title: "Area 1. Leadership and Governance",
    id: "areas/area1/area1",
    standards: [
      "Sub-area 1.1. Vision-Mission", 
      "Sub-area 1.2. Leadership and Management", 
      "Sub-area 1.3. Strategic Management", 
      "Sub-area 1.4. Policy Formulation and Implementation", 
      "Sub-area 1.5. Risk Management"
    ]
  },
  {
    title: "Area 2. Quality Assurance",
    id: "areas/area2/area2",
    standards: ["Sub-area 2.1. Internal and External Quality Assurance"]
  },
  {
    title: "Area 3. Resource Management",
    id: "areas/area3/area3",
    standards: [
      "Sub-area 3.1. Human Resources", 
      "Sub-area 3.2. Financial Resources", 
      "Sub-area 3.3. Learning, Physical Resources"
    ]
  },
  {
    title: "Area 4. Teaching-Learning",
    id: "areas/area4/area4",
    standards: [
      "Sub-area 4.1. Curriculum Programs", 
      "Sub-area 4.2. Teaching and Learning Methods",
      "Sub-area 4.3. Student Assessment"
    ]
  },
  {
    title: "Area 5. Student Services",
    id: "areas/area5/area5",
    standards: [
      "Sub-area 5.1. Student Recruitment, Admission, and Placement", 
      "Sub-area 5.2. Student Services Programs and Support"
    ]
  },
  {
    title: "Area 6. External Relations",
    id: "areas/area6/area6",
    standards: [
      "Sub-area 6.1. Networks, Linkages, and Partnerships", 
      "Sub-area 6.2. Community Engagement Services"
    ]
  },
  {
    title: "Area 7. Research",
    id: "areas/area7/area7",
    standards: ["Sub-area 7.1. Research Management and Collaboration"]
  },
  {
    title: "Area 8. Results",
    id: "areas/area8/area8",
    standards: [
      "Sub-area 8.1. Educational Results", 
      "Sub-area 8.2. Community and Service Results",
      "Sub-area 8.3. Research Results",
      "Sub-area 8.4. Financial and Competitiveness Results"
    ]
  },
  // Start sa PART IV
  { title: "PART IV. Conclusion", header: true },
  { 
    title: "Overall Assessment of the Program’s Compliance", 
    id: "parts/part4/overall"
  },
  { 
    title: "Summary of the Strengths per Area", 
    id: "parts/part4/strength"
  },
  { 
    title: "Summary of the Weaknesses Identified per Area", 
    id: "parts/part4/weakness"
  },
  // Start sa PART V
  { title: "PART V. Annexes", header: true },
  { 
    title: "Supporting Evidences", 
    id: "parts/part5/supporting"
  },
  { 
    title: "Actual Evidences", 
    id: "parts/part5/actual"
  },
  { title: "PART V. Summary of Ratings", header: true },
  { 
    title: "Statistical Summary of Ratings", 
    id: "parts/part6/ratings"
  },
];

const sidebar = document.getElementById("sidebar");


menuItems.forEach(item => {
  if (item.header) {
    if (item.id) {
      sidebar.innerHTML += `<a href="#" class="menu-header" data-page="${item.id}">${item.title}</a>`;
    } else {
      sidebar.innerHTML += `<div class="menu-header">${item.title}</div>`;
    }

  } else if (!item.standards) {
    sidebar.innerHTML += `<a href="#" class="sidebar-link" data-page="${item.id}">${item.title}</a>`;

  } else {
    const submenuId = `${item.id}-submenu`;
    sidebar.innerHTML += `
      <div class="area">
        <a href="#" class="area-title" data-submenu="${submenuId}" data-page="${item.id}">
          ${item.title}
        </a>
        <div id="${submenuId}" class="submenu">
          ${item.standards.map((std, i) =>
            `<a href="#" data-page="${item.id}-standard${i + 1}">${std}</a>`
          ).join('')}
        </div>
      </div>
    `;

  }
});



sidebar.addEventListener("click", e => {
  const target = e.target;
  if (target.tagName.toLowerCase() === "a") {
    e.preventDefault();

    const page = target.dataset.page;
    const submenuId = target.dataset.submenu;

    if (submenuId && (!page || !page.includes("standard"))) {
      document.getElementById(submenuId).classList.toggle("open");
      return;
    }

    
    if (page) {
      loadContent(page);
      
      if (window.innerWidth <= 768) {
        document.getElementById("sidebar").classList.remove("open");
        document.body.classList.remove("sidebar-open");
      }
    }
  }
});

document.getElementById('overlay').addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
  document.body.classList.remove('sidebar-open');
});




function loadContent(page) {
  const noCache = new Date().getTime();
  fetch(`${page}.html?v=${noCache}`)
    .then(res => res.text())
    .then(data => {
      document.getElementById("content").innerHTML = data;
      console.log("Loading:", page + ".html");
    })
    .catch(() => {
      document.getElementById("content").innerHTML = "<p>Error.</p>";
    });
}

if (submenuId) {
  document.getElementById(submenuId).classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
  const defaultPage = "parts/part1/identity";
  loadContent(defaultPage);

  const link = document.querySelector('a[data-page="' + defaultPage + '"]');
  if (link) link.classList.add("active");
});
