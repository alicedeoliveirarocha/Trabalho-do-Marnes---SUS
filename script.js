document.getElementById('patient-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const birthYear = parseInt(document.getElementById('birth-year').value);
    const cpf = document.getElementById('cpf').value;
    const symptoms = document.getElementById('symptoms').value;
    const allergy = document.getElementById('allergy').value;
  
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
  
    const urgency = determineUrgency(symptoms);
  
    const patient = {
        name: name,
        birthYear: birthYear,
        cpf: cpf,
        symptoms: symptoms,
        allergy: allergy,
        age: age,
        urgency: urgency
    };
  
    addPatientToList(patient);
    this.reset();
  });
  
  function determineUrgency(symptoms) {
    const emergencySymptoms = ['dor no peito', 'dificuldade para respirar', 'perda de consciência', 'hemorragia'];
    const veryUrgentSymptoms = ['febre alta', 'vômito severo', 'dor intensa'];
    const urgentSymptoms = ['dor moderada', 'febre moderada', 'tontura'];
    const lessUrgentSymptoms = ['dor leve', 'tosse', 'dor de cabeça leve'];
  
    if (emergencySymptoms.some(symptom => symptoms.toLowerCase().includes(symptom))) {
        return 'emergency';
    } else if (veryUrgentSymptoms.some(symptom => symptoms.toLowerCase().includes(symptom))) {
        return 'very urgent';
    } else if (urgentSymptoms.some(symptom => symptoms.toLowerCase().includes(symptom))) {
        return 'urgent';
    } else if (lessUrgentSymptoms.some(symptom => symptoms.toLowerCase().includes(symptom))) {
        return 'less urgent';
    } else {
        return 'not urgent';
    }
  }
  
  function addPatientToList(patient) {
    const patientList = document.getElementById('patient-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${patient.name} (CPF: ${patient.cpf}, ${patient.age} anos) - Sintomas: ${patient.symptoms} - Alergia: ${patient.allergy === 'sim' ? 'Sim' : 'Não'} - Urgência: ${formatUrgency(patient.urgency)}`;
    listItem.dataset.age = patient.age;
    listItem.dataset.urgency = patient.urgency;
  
    const items = Array.from(patientList.querySelectorAll('li'));
    items.push(listItem);
    items.sort((a, b) => urgencyLevel(b.dataset.urgency) - urgencyLevel(a.dataset.urgency) || b.dataset.age - a.dataset.age);
  
    patientList.innerHTML = '';
    items.forEach(item => patientList.appendChild(item));
  }
  
  function formatUrgency(urgency) {
    switch (urgency) {
        case 'emergency':
            return 'Emergência';
        case 'very urgent':
            return 'Muito Urgente';
        case 'urgent':
            return 'Urgente';
        case 'less urgent':
            return 'Pouco Urgente';
        case 'not urgent':
            return 'Não Urgente';
    }
  }
  
  function urgencyLevel(urgency) {
    switch (urgency) {
        case 'emergency':
            return 4;
        case 'very urgent':
            return 3;
        case 'urgent':
            return 2;
        case 'less urgent':
            return 1;
        case 'not urgent':
            return 0;
    }
  }