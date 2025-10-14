document.addEventListener('DOMContentLoaded', function() {
    // === Selektor Elemen DOM ===
    const taskForm = document.getElementById('task-form');
    const taskNameInput = document.getElementById('task-name');
    const courseNameInput = document.getElementById('course-name');
    const taskDeadlineInput = document.getElementById('task-deadline');
    const taskList = document.getElementById('task-list');
    const incompleteCountSpan = document.getElementById('incomplete-count');
    const searchInput = document.getElementById('search-input');
    const filterStatus = document.getElementById('filter-status');

    // === Selektor Elemen Modal Edit ===
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    const editTaskIdInput = document.getElementById('edit-task-id');
    const editTaskNameInput = document.getElementById('edit-task-name');
    const editCourseNameInput = document.getElementById('edit-course-name');
    const editTaskDeadlineInput = document.getElementById('edit-task-deadline');
    const closeButton = document.querySelector('.close-button');


    // Memuat tugas dari localStorage atau menggunakan array kosong jika tidak ada
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // === Fungsi-Fungsi Utama ===

    // Fungsi untuk menyimpan tugas ke localStorage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Fungsi untuk merender (menampilkan) daftar tugas
    const renderTasks = () => {
        taskList.innerHTML = '';
        const searchTerm = searchInput.value.toLowerCase();
        const statusFilter = filterStatus.value;
        let incompleteCount = 0;

        const filteredTasks = tasks.filter(task => {
            const matchesSearch = task.name.toLowerCase().includes(searchTerm) || task.course.toLowerCase().includes(searchTerm);
            const matchesStatus = (statusFilter === 'all') || 
                                  (statusFilter === 'completed' && task.completed) || 
                                  (statusFilter === 'incomplete' && !task.completed);
            return matchesSearch && matchesStatus;
        });

        if (filteredTasks.length === 0) {
            taskList.innerHTML = '<li>Tidak ada tugas yang sesuai.</li>';
        } else {
            filteredTasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''}`;
                li.dataset.id = task.id;

                li.innerHTML = `
                    <div class="task-info">
                        <h3>${task.name}</h3>
                        <p><strong>Matkul:</strong> ${task.course} | <strong>Deadline:</strong> ${task.deadline}</p>
                    </div>
                    <div class="task-actions">
                        <button class="btn-complete">${task.completed ? 'Batal' : 'Selesai'}</button>
                        <button class="btn-edit">Edit</button>
                        <button class="btn-delete">Hapus</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
        }
        
        // Menghitung dan menampilkan jumlah tugas yang belum selesai
        tasks.forEach(task => {
            if (!task.completed) {
                incompleteCount++;
            }
        });
        incompleteCountSpan.textContent = incompleteCount;
    };

    // Fungsi untuk menambah tugas baru
    const addTask = (name, course, deadline) => {
        const newTask = {
            id: Date.now(),
            name: name,
            course: course,
            deadline: deadline,
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
    };

    // Fungsi untuk menandai tugas sebagai selesai/belum selesai
    const toggleTaskComplete = (id) => {
        tasks = tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveTasks();
        renderTasks();
    };

    // Fungsi untuk menghapus tugas
    const deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    };
    
    // === FUNGSI-FUNGSI BARU UNTUK EDIT ===

    // Fungsi untuk membuka modal dan mengisi data tugas
    const openEditModal = (id) => {
        const task = tasks.find(task => task.id === id);
        if (task) {
            editTaskIdInput.value = task.id;
            editTaskNameInput.value = task.name;
            editCourseNameInput.value = task.course;
            editTaskDeadlineInput.value = task.deadline;
            editModal.style.display = 'block';
        }
    };

    // Fungsi untuk menutup modal
    const closeEditModal = () => {
        editModal.style.display = 'none';
    };
    
    // Fungsi untuk mengupdate tugas
    const updateTask = (id, name, course, deadline) => {
        tasks = tasks.map(task => 
            task.id === id ? { ...task, name, course, deadline } : task
        );
        saveTasks();
        renderTasks();
        closeEditModal();
    };


    // === Event Listener ===

    // Event listener untuk form submit (Tambah Tugas)
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskName = taskNameInput.value.trim();
        const courseName = courseNameInput.value.trim();
        const taskDeadline = taskDeadlineInput.value;

        // Validasi Form
        if (taskName === '' || courseName === '' || taskDeadline === '') {
            alert('Semua field harus diisi!');
            return;
        }

        const deadlineDate = new Date(taskDeadline);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (deadlineDate < today) {
            alert('Tanggal deadline tidak boleh tanggal yang sudah lewat.');
            return;
        }

        addTask(taskName, courseName, taskDeadline);
        taskForm.reset();
    });

    // Event listener untuk daftar tugas (Selesai, Edit, Hapus)
    taskList.addEventListener('click', (e) => {
        const target = e.target;
        const parentLi = target.closest('.task-item');
        if (!parentLi) return;

        const taskId = Number(parentLi.dataset.id);

        if (target.classList.contains('btn-complete')) {
            toggleTaskComplete(taskId);
        } else if (target.classList.contains('btn-edit')) { // <-- Logika untuk tombol edit
            openEditModal(taskId);
        } else if (target.classList.contains('btn-delete')) {
            if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
                deleteTask(taskId);
            }
        }
    });

    // Event listener untuk form submit (Simpan Perubahan)
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = Number(editTaskIdInput.value);
        const name = editTaskNameInput.value.trim();
        const course = editCourseNameInput.value.trim();
        const deadline = editTaskDeadlineInput.value;

        // Validasi Form Edit
        if (name === '' || course === '' || deadline === '') {
            alert('Semua field harus diisi!');
            return;
        }
        
        updateTask(id, name, course, deadline);
    });

    // Event listener untuk menutup modal
    closeButton.addEventListener('click', closeEditModal);
    window.addEventListener('click', (e) => {
        if (e.target == editModal) {
            closeEditModal();
        }
    });

    // Event listener untuk filter dan pencarian
    searchInput.addEventListener('input', renderTasks);
    filterStatus.addEventListener('change', renderTasks);

    // Render tugas saat halaman pertama kali dimuat
    renderTasks();
});