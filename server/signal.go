package main

// Import OS and fmt packages
import (
	"fmt"
	"io/ioutil"
	"math"
	"net"
	"time"
)

// Square wave fourier transform
func fourier(amp float64, t float64, n int) float64 {
	a := 0.0
	for i := 1; i < n; i += 2 {
		fi := float64(i)
		a += amp * math.Sin(fi*t) / fi
	}
	return a
}

func main() {
	host := "127.0.0.1:9009"
	tcpAddr, err := net.ResolveTCPAddr("tcp4", host)
	checkErr(err)

	conn, err := net.DialTCP("tcp", nil, tcpAddr)
	checkErr(err)
	defer conn.Close()

	i := 0.0
	for i < 1000 {
		fi := float64(i)
		fv := fourier(2.0, fi, 10)
		// v := strconv.FormatFloat(fv, 'f', 2, 32)
		// t := time.Now().UTC().Format("2006-01-02T15:04:05.000Z") // Same format as JavaScript
		// fmt.Println(v)
		// fmt.Println(t)

		// s := fmt.Sprintf("pirds,event=E type=D loc=O num=1 ms=2%d", time.Now().UnixNano())

		s := fmt.Sprintf("pirds,event=E,type=D loc=0,num=1,value=%f %d", fv, time.Now().UnixNano())

		_, err = conn.Write([]byte(fmt.Sprintf("%s\n", s)))
		checkErr(err)

		time.Sleep(500 * time.Millisecond)
		i += 0.1
	}

	result, err := ioutil.ReadAll(conn)
	checkErr(err)

	fmt.Println(string(result))
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
