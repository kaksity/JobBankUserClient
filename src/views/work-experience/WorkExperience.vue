<template>
  <v-container
    grid-list-lg
    pa-0
  >
    <v-layout wrap>
      <v-flex
        xs12
        lg12
      >
        <v-basic-card
          title="Complete Work Experiences By the User"
          toolbar-height="56"
        >
          <template slot="card-content">
            <v-form @submit.prevent="AddWorkExperience">
              <v-container fluid>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    md12
                    lg12
                  >
                    <v-text-field
                      v-model="EmployerName"
                      label="Name of Employer"
                    />
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex
                    xs12
                    sm12
                    md6
                    lg6
                  >
                    <v-text-field
                      v-model="JobTitle"
                      label="Job Title"
                    />
                  </v-flex>

                  <v-flex
                    xs12
                    sm12
                    md6
                    lg6
                  >
                    <v-select
                      v-model="CurrentlyWorking"
                      label="Are you still there"
                      :items="AreYouStillThereList"
                      item-value="name"
                      item-text="value"
                    />
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex
                    xs12
                    sm12
                    md6
                    lg6
                  >
                    <v-menu
                      ref="StartWorkingMenu"
                      v-model="StartWorkingMenu"
                      :close-on-content-click="false"
                      :return-value.sync="StartWorkingDate"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{on, attrs}">
                        <v-text-field
                          v-model="StartWorkingDate"
                          label="When did you stop working there"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="StartWorkingDate"
                        no-title
                        scrollable
                      >
                        <v-spacer />
                        <v-btn
                          text
                          @click="StartWorkingMenu = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          @click="$refs.StartWorkingMenu.save(StartWorkingDate)"
                        >
                          Ok
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex
                    xs12
                    sm12
                    md6
                    lg6
                  >
                    <v-menu
                      ref="StopWorkingMenu"
                      v-model="StopWorkingMenu"
                      :close-on-content-click="false"
                      :return-value.sync="StopWorkingDate"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{on, attrs}">
                        <v-text-field
                          v-model="StopWorkingDate"
                          label="When did you stop working there"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="StopWorkingDate"
                        no-title
                        scrollable
                      >
                        <v-spacer />
                        <v-btn
                          text
                          @click="StopWorkingMenu = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          @click="$refs.StopWorkingMenu.save(StopWorkingDate)"
                        >
                          Ok
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex
                    xs12
                    sm12
                    md6
                    lg6
                  >
                    <v-textarea
                      v-model="JobDescription"
                      label="Job Description"
                    />
                  </v-flex>
                  <v-flex
                    xs12
                    sm12
                    md6
                    lg6
                  >
                    <v-textarea
                      v-model="AdditionalInformation"
                      label="Additional Information"
                    />
                  </v-flex>
                </v-layout>
                <v-layout wrap row>
                  <v-flex>
                    <v-btn
                      color="primary"
                      class="mr-0"
                      type="submit"
                    >
                      Add Work Experience
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </template>
        </v-basic-card>
      </v-flex>
      <v-flex>
        <v-basic-card
          mt-2
          title="List Of Work Experiences"
          toolbar-height="56"
        >
          <template slot="card-content">
            <v-data-table
              :headers="headers"
              :items="list"
              item-key="name"
              hide-actions
              class="elevation-1"
            >
              <template
                slot="items"
                slot-scope="props"
              >
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.age }}</td>
                <td>{{ props.item.address }}</td>
                <td>
                  <svg-icon
                    class="drag-handler"
                    icon-class="drag"
                  />
                </td>
              </template>
            </v-data-table>
          </template>
        </v-basic-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'WorkExperience',
  data() {
    return {
      StartWorkingDate: new Date().toISOString().substr(0, 10),
      StopWorkingDate: new Date().toISOString().substr(0, 10),
      StartWorkingMenu: false,
      StopWorkingMenu: false,
      AreYouStillThereList: [{ name: 'YES', value: 'Yes' }, { name: 'NO', value: 'No' }],
      EmployerName: '',
      JobTitle: '',
      CurrentlyWorking: '',
      JobDescription: '',
      AdditionalInformation: '',
      WorkExperiencesList: [],

      headers: [
        {
          text: 'Job Title',
          align: 'left',
          sortable: false,
          value: 'job_title',
        },
        {
          text: 'Employer',
          value: 'age',
          sortable: false,
          value: 'employer'
        },
        {
          text: 'Start Date',
          value: 'address',
          sortable: false,
          value: 'start_date'
        },
        {
          text: 'Stop Date',
          value: 'drag',
          sortable: false,
          value: 'stop_date'
        },
        {
          text: 'Action',
          value: 'drag',
          sortable: false,
        },
      ],
      list: [
      ],
    };
  },
  methods: {
    AddWorkExperience () {
      if (this.EmployerName === '') {
        this.$message({
          type: 'error',
          text: 'Employer Name is required'
        });
        return;
      } else if (this.JobTitle === '') {
        this.$message({
          type: 'error',
          text: 'Employer Name is required'
        });
        return;
      } else if (this.CurrentlyWorking === '') {
        this.$message({
          type: 'error',
          text: 'Employer Name is required'
        });
        return;
      } else if (this.JobDescription === '') {
        this.$message({
          type: 'error',
          text: 'Employer Name is required'
        });
        return;
      } else if (this.StartWorkingDate === '') {
        this.$message({
          type: 'error',
          text: 'Employer Name is required'
        });
        return;
      } else if (this.StopWorkingDate === '') {
        this.$message({
          type: 'error',
          text: 'Employer Name is required'
        });
        return;
      }

      const Form = {
        additional_information: this.AdditionalInformation,
        current_work: this.CurrentlyWorking,
        description: this.JobDescription,
        end_date: this.StopWorkingDate,
        job_title: this.JobTitle,
        organisation: this.EmployerName,
        start_date: this.StartWorkingDate,
      }

      this.$api.PostWorkExperience(Form).then(res => {
        this.$message({
          type: 'success',
          text: res.message
        });

      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.data.message
        });
      }).finally(() => {
      });
    },

    DeleteWorkExperience (id) {
      if (id === '') {
        return
      }
      this.LoadingStatus = true
      deleteWorkExperiences(id).then(res => {
        this.LoadingStatus = false
        if (res.success === false) {
          this.Color = 'error'
        } else {
          this.Color = 'success'
        }

        this.Message = res.message
        this.Dialog = true
      })

      setTimeout(() => {
        location.reload()
      }, 1000)
    },
  },
  created(){
  }
};
</script>
