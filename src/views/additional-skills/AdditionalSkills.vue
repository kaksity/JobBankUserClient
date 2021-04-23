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
          title="Complete Additional Skills By the User"
          toolbar-height="56"
        >
          <template slot="card-content">
            <v-form @submit.prevent="AddSkill">
              <v-container fluid>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    lg12
                  >
                    <v-select
                      v-model="Skill"
                      :items="SkillSetList"
                      item-text="name"
                      item-value="id"
                      label="Additional Skill Set"
                      @change="changeSkill"
                    />
                  </v-flex>
                  <v-flex
                    v-if="SpecifyOthers"
                    xs12
                    sm12
                  >
                    <v-text-field
                      v-model="OtherSkillName"
                      label="Specify Other Skill"
                    />
                  </v-flex>
                  <v-flex
                    sm6
                    md6
                  >
                    <v-btn
                      color="primary"
                      block
                      type="submit"
                      class="mr-0"
                    >
                      Add Skill
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
                <td>
                  <v-icon @click="DeleteAdditionalSkill(props.item.id)">delete</v-icon>
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
  name: 'AdditionalSkills',
  data() {
    return {
      Skill: '',
      OtherSkillName: '',
      SpecifyOthers: false,
      SkillSetList: [],
      SkillList: [],

      headers: [
        {
          text: 'Additional Name',
          align: 'left',
          sortable: false,
          value: 'job_title',
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
    changeSkill (i) {
      if (i !== '19') {
        this.SpecifyOthers = false
      } else {
        this.SpecifyOthers = true
      }
    },
    FillSkillSetSelect() {
      this.$api.GetSkillSet().then((res) => {

        this.SkillSetList = res.data;
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.message
        });
      });
    },
    FillAdditionalSkillsTable() {
      this.$api.GetAdditionalSkills().then((res) => {
        this.list = res.data;
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.data.message
        });
      });
    },
    AddSkill () {
      // Check if the a Skill has been selected
      if (this.Skill === '') {
        this.$message({
          type: 'error',
          text: 'Skills Set is required'
        });
        return;
      }

      if (this.Skill === '19' && this.OtherSkillName === '') {
       this.$message({
         type: 'error',
         text: 'Specify Other Skills'
       });
       return;
      }

      let Form = {};

      if (this.Skill !== '19') {
        Form = {
          id: this.Skill,
          name: '',
        }
      } else {
        Form = {
          id: this.Skill,
          name: this.OtherSkillName,
        }
      }

      this.$api.PostAdditionalSkills(Form).then(res => {
        this.$message({
          type: 'success',
          text: res.message
        });
        this.FillAdditionalSkillsTable();
        this.ClearFields();
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.data.message
        });
      });
    },
    ClearFields() {
      this.Skill = '';
      this.OtherSkillName = '';
    },
    DeleteAdditionalSkill (i) {

      this.$api.DeleteAdditionalSkills(i).then(res => {
        this.$message({
          type: 'success',
          text: res.message
        });
        this.FillAdditionalSkillsTable();
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.data.message
        });
      });
    },
  },
  created(){
    this.FillAdditionalSkillsTable();
    this.FillSkillSetSelect();
  }
};
</script>
