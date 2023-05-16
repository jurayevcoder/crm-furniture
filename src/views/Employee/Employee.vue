<script setup>
import { ref, reactive, onMounted } from "vue";
import { employeeStore } from "../../stores/employee/employeeStore.js";
import { toast } from "vue3-toastify";
import { useEmployee } from "../../service/employee";

const modal = ref(false);
const toggleModal = () => (modal.value = !modal.value);

const pagination = reactive({
  totalPage: 0,
  currentPage: 0,
  totalCount: 0,
  endpage: 0,
});

let start = ref(0);
let end = ref(0);
let count = ref(0);

const employeeInfo = reactive({
  fullname: "",
  tel: "",
  role: "",
  card: "",
  login: "",
  password: "",
  status: false,
});

const store = employeeStore();

const listUpdate = (num) => {
  useEmployee.list(num).then((res) => {
    console.log(res);
    pagination.totalCount = res?.data?.pagination?.totalCount;
    pagination.currentPage = res?.data?.pagination?.currentPage?.page;
    pagination.totalPage = res?.data?.pagination?.totalPage;
    pagination.endpage = res?.data?.records?.length;
    start.value = pagination.currentPage * 10 - 9;
    end.value = pagination.currentPage * 10 - 10 + pagination.endpage;
    count.value = res?.data?.pagination?.totalCount;
    store.SET_LIST(res?.data?.records);
  });
};

const addEmployee = () => {
  const employee = {
    full_name: employeeInfo.fullname,
    phone_number: employeeInfo.tel,
    role: employeeInfo.role.toUpperCase(),
    card: employeeInfo.card,
    login: employeeInfo.login,
    password: employeeInfo.password,
    status: employeeInfo.status,
  };

  useEmployee
    .create(employee)
    .then(() => {
      listUpdate(localStorage.getItem("page_number"));
    })
    .catch((err) => {
      console.log(err);
    });

  toast.success("successfully added employee !", {
    autoClose: 500,
    theme: "dark",
    pauseOnHover: true,
  });

  employeeInfo.fullname = "";
  employeeInfo.tel = "";
  employeeInfo.role = "";
  employeeInfo.card = "";
  employeeInfo.login = "";
  employeeInfo.password = "";

  toggleModal();
};

const paginate = (num) => {
  localStorage.setItem("page_number", num);
  listUpdate(num);
};

const active = (id, status) => {
  const statusId = {
    id: id,
    is_active: !status,
  };

  console.log(statusId);

  useEmployee
    .isactive(statusId)
    .then((res) => {
      if (res.status === 201) {
        toast.success("success");
        listUpdate(localStorage.getItem("page_number"));
      }
    })
    .catch(() => {
      toast.error("error");
    });
};

const remove = (id) => {
  useEmployee
    .delete(id)
    .then((res) => {
      if (res.status === 200) {
        toast.success("success");
        if (localStorage.getItem("page_number") >= pagination.totalPage) {
          listUpdate(pagination.totalPage);
        } else {
          listUpdate(localStorage.getItem("page_number"));
        }
      }
    })
    .catch(() => {
      toast.error("error");
    });
};

onMounted(() => {
  listUpdate(localStorage.getItem("page_number"));
});
</script>

<template>
  <div class="p-3">
    <h2 class="uppercase dark:text-white text-gray-900 text-center text-4xl">Hodimlar</h2>

    <!-- ----------------------------------------- MODAL -------------------------------------------------------- -->

    <!-- Main modal -->
    <div
      tabindex="-1"
      aria-hidden="true"
      :class="
        modal
          ? 'overflow-y-auto flex bg-[rgba(0,0,0,0.4)] overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full'
          : 'hidden'
      "
    >
      <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <!-- Modal header -->
          <div
            class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Yangi hodim qo'shish
            </h3>
            <button
              @click="toggleModal"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <form @submit.prevent="addEmployee">
            <div class="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >I.F.O</label
                >
                <input
                  v-model="employeeInfo.fullname"
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Ismingizni kiriting"
                  required=""
                />
              </div>
              <div>
                <label
                  for="phone"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Tel:</label
                >
                <input
                  v-model="employeeInfo.tel"
                  type="text"
                  name="phone"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Telefon raqamingizni kiriting"
                  required=""
                />
              </div>
              <div>
                <label
                  for="cart number"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Karta raqami</label
                >
                <input
                  v-model="employeeInfo.card"
                  type="text"
                  name="cart number"
                  id="cart number"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Karta raqam kiriting"
                  required=""
                />
              </div>
              <div>
                <label
                  for="category"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Lavozim</label
                >
                <select
                  v-model="employeeInfo.role"
                  id="category"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected="" disabled>Lavozimni tanlang</option>
                  <option value="Admin">Admin</option>
                  <option value="Operator">Operator</option>
                  <option value="Eltuvchi">Eltuvchi</option>
                </select>
              </div>
              <div>
                <label
                  for="login"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Login</label
                >
                <input
                  v-model="employeeInfo.login"
                  type="text"
                  name="login"
                  id="login"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username kiriting"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Parol</label
                >
                <input
                  v-model="employeeInfo.password"
                  type="password"
                  name="password"
                  id="password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Parolni kiriting"
                  required=""
                />
              </div>
            </div>
            <button
              type="submit"
              class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                class="mr-1 -ml-1 w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Yangi hodim qo'shish
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- ----------------------------------------- MODAL END ---------------------------------------------------- -->

    <!-- ----------------------------------------- EMPLYE TABLE ------------------------------------------------- -->

    <section class="dark:bg-gray-900 p-0 sm:p-5 md:p-0 md:py-4">
      <div class="w-full max-w-screen px-0 lg:p-0">
        <!-- Start coding here -->
        <div
          class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden"
        >
          <div
            class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
          >
            <div class="w-full md:w-1/2">
              <form class="flex items-center">
                <label for="simple-search" class="sr-only">Qidiruv</label>
                <div class="relative w-full">
                  <div
                    class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Qidiruv"
                    required=""
                  />
                </div>
              </form>
            </div>
            <div
              class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
            >
              <button
                @click="toggleModal"
                id=""
                type="button"
                class="flex items-center justify-center border border-gray-200 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <svg
                  class="h-3.5 w-3.5 mr-2"
                  fill="currentColor"
                  viewbox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                Hodim qo'shish
              </button>

              <div class="flex items-center space-x-3 w-full md:w-auto">
                <button
                  id="actionsDropdownButton"
                  data-dropdown-toggle="actionsDropdown"
                  class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  type="button"
                >
                  <svg
                    class="-ml-1 mr-1.5 w-5 h-5"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    />
                  </svg>
                  Lavozim
                </button>
                <div
                  id="actionsDropdown"
                  class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    class="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="actionsDropdownButton"
                  >
                    <li>
                      <a
                        href="#"
                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >Admin</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >Operator</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      ></a>
                    </li>
                  </ul>
                </div>
                <button
                  id="filterDropdownButton"
                  data-dropdown-toggle="filterDropdown"
                  class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    class="h-4 w-4 mr-2 text-gray-400"
                    viewbox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Saralash
                  <svg
                    class="-mr-1 ml-1.5 w-5 h-5"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    />
                  </svg>
                </button>
                <div
                  id="filterDropdown"
                  class="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
                >
                  <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                    Holatni tanlang
                  </h6>
                  <ul class="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                    <li class="flex items-center">
                      <input
                        id="apple"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        for="apple"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >Faol</label
                      >
                    </li>
                    <li class="flex items-center">
                      <input
                        id="fitbit"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        for="fitbit"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >Faol emas</label
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="px-4 py-3">I.F.O</th>
                  <th scope="col" class="px-4 py-3">Tel</th>
                  <th scope="col" class="px-4 py-3">Lavozimi</th>
                  <th scope="col" class="px-4 py-3">Katra raqami</th>
                  <th scope="col" class="px-4 py-3">Holati</th>
                  <th scope="col" class="px-4 py-3">O'zgartish</th>
                  <th scope="col" class="px-4 py-3">O'chirish</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(el, i) in store.LIST"
                  :key="i"
                  class="border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {{ el.full_name }}
                  </th>
                  <td class="px-4 py-3">{{ el.phone_number }}</td>
                  <td class="px-4 py-3">{{ el.role }}</td>
                  <td class="px-4 py-3">{{ el.card }}</td>
                  <td class="px-4 py-3">{{ el.is_active ? "Faol" : "Faolemas" }}</td>
                  <td class="px-4 py-3">
                    <button
                      @click="active(el.id, el.is_active)"
                      :class="
                        el.is_active
                          ? 'bg-green-500 px-3 py-2 text-white focus:ring-2'
                          : 'bg-red-500 px-3 py-2 text-white focus:ring-2'
                      "
                    >
                      {{ el.is_active ? "On" : "Off" }}
                    </button>
                  </td>
                  <td class="px-4 py-3">
                    <button
                      @click="remove(el.id)"
                      class="bg-red-500 px-3 py-2 text-white focus:ring-2"
                    >
                      O'chirish
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav
            class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
              Sahifa
              <span class="font-semibold text-gray-900 dark:text-white"
                >{{ start }} - {{ end }}</span
              >
              dan
              <span class="font-semibold text-gray-900 dark:text-white">{{ count }}</span>
            </span>
            <ul class="inline-flex items-stretch -space-x-px">
              <li v-for="el in pagination.totalPage" :key="el" @click="paginate(el)">
                <a
                  href="#"
                  class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >{{ el }}</a
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>

    <!-- ----------------------------------------- EMPLYE TABLE END --------------------------------------------- -->
  </div>
</template>

<style scoped></style>
