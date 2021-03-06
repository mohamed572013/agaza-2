<?php

    class Hotel_slider_model extends CI_Model{

        private $_table = 'maka_madina_hotels_slider';
        public $images_dimensions = array(
            's' => array('width' => '150', 'height' => 82),
            'l' => array('width' => '750', 'height' => 411),
        );

        public function __construct(){
            parent::__construct();
        }

        public function getAll($hotel_id){
            $this->db->select('*');
            $this->db->from($this->_table);
            $this->db->where('maka_madina_hotels_id', $hotel_id);
            $query = $this->db->get();
            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return false;
            }
        }

        public function add($data_array){
            $this->db->insert($this->_table, $data_array);
            $affected_rows = $this->db->affected_rows();
            if ($affected_rows > 0) {
                return $this->db->insert_id();
            } else {
                return false;
            }
        }

        public function delete($where_array = array()){
            $this->db->where($where_array);
            $this->db->delete($this->_table);
            $affected_rows = $this->db->affected_rows();
            if ($affected_rows > 0) {
                return true;
            } else {
                return false;
            }
        }

        public function do_upload($image, $config, $new_path){
            $this->load->library('upload');
            $this->upload->initialize($config);
            if (!$this->upload->do_upload($image)) {
                return FALSE;
            } else {
                $data = $this->upload->data();
                $file_resized_name = resize5($data, $new_path, $this->images_dimensions, true);
                return $file_resized_name;
            }
        }

    }
