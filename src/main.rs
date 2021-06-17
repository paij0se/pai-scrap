use rand::seq::SliceRandom;
use regex::Regex;
use std::process::{Command, Stdio};
use std::thread;

fn threads() {
    let url = "https://github.com/ELPanaJose"; // Here you put the url
    let samples = vec![
        "https://github.com/ELPanaJose/",
        "https://boards.4chan.org/s4s/",
        "https://www.youtube.com",
        "https://paijose.tk",
    ];
    let sample: Vec<_> = samples
        .choose_multiple(&mut rand::thread_rng(), 1)
        .collect();
    println!("{:?}", sample); // just pick a random string from the vector
    const NTHREADS: u32 = 2; // number of threads
    let mut children = vec![];

    for i in 0..NTHREADS {
        children.push(thread::spawn(move || {
            println!("this is thread number {}", i);
            let ou = Command::new("curl")
                .arg(url)
                .stdout(Stdio::piped())
                .output()
                .expect("Failed to execute command");

            //let re = Regex::new(r"(https?://([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?)",).unwrap(); // match all the https and http links
            let re = Regex::new(r"(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)").unwrap(); // match all the .png, .jpg, .gif https and http links
            let output = String::from_utf8(ou.stdout).unwrap();
            let formated = re.find_iter(&output);
            for i in formated {
                println!("{}", i.as_str())
            }
        }));
    }

    for child in children {
        let _ = child.join();
    }
}

fn main() {
    threads();
    println!("lmao");
}
