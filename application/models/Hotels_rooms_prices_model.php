<?php

    class Hotels_rooms_prices_model extends CI_Model{

        private $table = 'hotels_rooms_prices';

        public function __construct(){
            parent::__construct();
        }

        public function find($hotels_rooms_id){
            $this->db->select('*');
            $this->db->from($this->table);
            $this->db->where('id', $hotels_rooms_id);
            $query = $this->db->get();
            if ($query->num_rows() > 0) {
                return $query->row();
            } else {
                return false;
            }
        }

        public function add($array_date = array()){
            $this->db->insert($this->table, $array_date);
            return $this->db->insert_id();
        }

        public function update($data_array = array(), $where_array = array()){
            $this->db->where($where_array);
            if (count($where_array) > 0) {
                foreach ($where_array as $key => $value) {
                    $this->db->where($key, $value);
                }
            }
            $this->db->update($this->table, $data_array);
            $affected_rows = $this->db->affected_rows();
            if ($affected_rows > 0) {
                return true;
            } else {
                return false;
            }
        }

        public function delete($where_array = array()){
            $this->db->where($where_array);
            $this->db->delete($this->table);
            $affected_rows = $this->db->affected_rows();
            if ($affected_rows > 0) {
                return true;
            } else {
                return false;
            }
        }

        public function resize_image($path, $file, $p){
            $this->load->library('image_lib');
            $this->image_lib->clear();
            $config['image_library'] = 'gd2';
            $config['source_image'] = $path;
            $config['create_thumb'] = TRUE;
            $config['maintain_ratio'] = TRUE;
            $config['width'] = 400;
            $config['height'] = 400;
            $config['new_image'] = './' . $p . $file;
            $this->image_lib->initialize($config);
            $this->image_lib->resize();
        }

        public function getAboutUs($branches_id){
            $this->db->select('*');
            $this->db->from($this->table);
            $this->db->where('branches_id', $branches_id);
            $query = $this->db->get();
            if ($query->num_rows() > 0) {
                return $query->row();
            } else {
                return false;
            }
        }

        public function findo($hotels_rooms_prices_id, $where_array = array()){
            $this->db->select('*');
            $this->db->from($this->table);
            $this->db->where('id', $hotels_rooms_prices_id);
            if (count($where_array) > 0) {
                foreach ($where_array as $key => $value) {
                    $this->db->where($key, $value);
                }
            }
            $query = $this->db->get();
            if ($query->num_rows() > 0) {
                return $query->row();
            } else {
                return false;
            }
        }

        public function check_added_before($hotel_id, $places_id, $hotel_rooms_id, $from_date, $to_date, $hotels_rooms_prices_id = false){
            $this->db->select('*');
            $this->db->from('hotels_rooms_prices');
            $this->db->join("places", "hotels_rooms_prices.places_id=places.id");
            $this->db->join("hotel_rooms", "hotels_rooms_prices.hotel_rooms_id=hotel_rooms.id");
            $this->db->where('hotels_rooms_prices.hotel_id', $hotel_id);
            $this->db->where('hotels_rooms_prices.places_id', $places_id);
            $this->db->where('hotels_rooms_prices.from_date', $from_date);
            $this->db->where('hotels_rooms_prices.to_date', $to_date);
            $this->db->where('hotels_rooms_prices.hotel_rooms_id', $hotel_rooms_id);
            if ($hotels_rooms_prices_id) {
                $this->db->where('hotels_rooms_prices.id !=', $hotels_rooms_prices_id);
            }
            $query = $this->db->get();
            if ($query->num_rows() > 0) {
                return true;
            } else {
                return false;
            }
        }

        public function check_date_in($hotel_id, $places_id, $hotel_rooms_id, $from_date, $to_date, $hotels_rooms_prices_id = false){
            $this->db->select('*');
            $this->db->from('hotels_rooms_prices');
            $this->db->join("places", "hotels_rooms_prices.places_id=places.id");
            $this->db->join("hotel_rooms", "hotels_rooms_prices.hotel_rooms_id=hotel_rooms.id");
            $this->db->where('hotels_rooms_prices.hotel_id', $hotel_id);
            $this->db->where('hotels_rooms_prices.places_id', $places_id);
            $this->db->where('hotels_rooms_prices.hotel_rooms_id', $hotel_rooms_id);
            if ($from_date) {
                $this->db->where('hotels_rooms_prices.from_date <=', $from_date);
                $this->db->where('hotels_rooms_prices.to_date >=', $from_date);
            }
            if ($to_date) {
                $this->db->where('hotels_rooms_prices.from_date <=', $to_date);
                $this->db->where('hotels_rooms_prices.to_date >=', $to_date);
            }
            if ($hotels_rooms_prices_id) {
                $this->db->where('hotels_rooms_prices.id !=', $hotels_rooms_prices_id);
            }
            $query = $this->db->get();
            if ($query->num_rows() > 0) {
                return $query->row();
            } else {
                return false;
            }
        }

    }
